<template>
    <div>
        <h3 v-if="cactus._id">Edit cactus</h3>
        <h3 v-else>Add a new cactus</h3>
        <input class="input-title" type="text" v-model="title" placeholder="An another Cactus"/>
        <textarea class="input-body" v-model="body" placeholder="Lorem ipsum dolor sit amet..."></textarea>
        <div class="box-container">
            <div class="box" :class="{ active: type === 'STD' }"
                 @click="type = 'STD'">standard</div>
            <div class="box margin-box" :class="{ active: type === 'ABOUT' }"
                 @click="type = 'ABOUT'">about</div>
            <div class="box margin-box" :class="{ active: type === 'CONTACT' }"
                 @click="type = 'CONTACT'">contact</div>
            <div class="box margin-box" :class="{ active: published }"
                 @click="published = !published">published</div>
            <div class="offset"></div>
            <div v-if="!cactus._id" class="box important margin-box" @click="addCactus">add</div>
            <div v-if="cactus._id" class="box important margin-box" @click="cancelEdit">cancel</div>
            <div v-if="cactus._id" class="box important margin-box" @click="editCactus">edit</div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { http } from "@/http/http";
import CommonButton from '@/components/CommonButton.vue'

@Component({
    components: {
        CommonButton
    }
})
export default class Admin extends Vue {
    @Prop() private cactus!: any;
    private title: string = this.cactus.title;
    private body: string = this.cactus.body;
    private type: string = this.cactus.type;
    private published: boolean = this.cactus.published;
    async addCactus() {
        try {
            if (this.title === '' || this.body === '') {
                return
            }
            await http.addCactus({
                title: this.title,
                body: this.body,
                type: this.type,
                published: this.published
            });
            this.title = '';
            this.body = '';
            this.type = 'STD';
            this.published = true;
        } catch (e) {
            console.error('Cannot create a new cactus');
            console.error(e)
        }
    }
    async editCactus() {
        try {
            if (this.title === '' || this.body === '') {
                return
            }
            let update: any = {
                _id: this.cactus._id,
                type: this.type,
                published: this.published
            };
            if (this.title !== this.cactus.title || this.body !== this.cactus.body) {
                update.title = this.title;
                update.body = this.body;
            }
            await http.editCactus(update);
            this.$router.go(-1)
        } catch (e) {
            console.error('Cannot edit cactus');
            console.error(e)
        }
    }
    cancelEdit() {
        this.$router.go(-1)
    }
}
</script>

<style scoped lang="stylus">
.input-title
    color black
    border: 2px solid black
    padding 10px
    background #a5a5a5
    width calc(100% - 24px)

.input-body
    margin-top 15px
    color black
    background #a5a5a5
    box-sizing border-box
    border 2px solid black
    padding 10px
    width 100%
    height 170px
    resize none

.box-container
    display flex
    margin 10px 0 20px 0
    align-items center
    flex-wrap wrap

.box
    border: 1px solid #000000
    padding 5px
    margin 5px 0 5px 0
    cursor pointer
    &:hover:not(.active)
        font-size 1.2em
        background #3bafff
        transition .3s

.active
    background #3bafff

.important
    font-weight bolder
    &:hover
        font-size 1.2em
        background #4CAF50
        transition .3s

.offset
    flex-grow 1

.margin-box
    margin-left 5px
</style>

