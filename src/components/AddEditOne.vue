<template>
    <div>
        <div class="title" v-if="cactus._id">Edit cactus</div>
        <div class="title" v-else>Add a new cactus</div>
        <input class="input-title" type="text" v-model="title" placeholder="An another Cactus"/>
        <textarea class="input-body" v-model="body" placeholder="Lorem ipsum dolor sit amet..."></textarea>
        <div class="btn-container">
            <flex-button :active="type === 'STD'" :text="'standard'" @click-on="type = 'STD'"></flex-button>
            <flex-button :active="type === 'ABOUT'" :marginLeft="true"
                         :text="'about'" @click-on="type = 'ABOUT'"></flex-button>
            <flex-button :active="type === 'CONTACT'" :marginLeft="true"
                         :text="'contact'" @click-on="type = 'CONTACT'"></flex-button>
            <flex-button :active="published" :marginLeft="true"
                         :text="'published'" @click-on="published = !published"></flex-button>
            <div class="offset"></div>
            <flex-button v-if="!cactus._id" :marginLeft="true" :text="'add'" @click-on="addCactus"></flex-button>
            <flex-button v-if="cactus._id" :marginLeft="true" :text="'cancel'" @click-on="cancelEdit"></flex-button>
            <flex-button v-if="cactus._id" :marginLeft="true" :text="'edit'" @click-on="editCactus"></flex-button>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { http } from "@/http/http";
import FlexButton from '@/components/FlexButton.vue'

@Component({
    components: {
        FlexButton
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
.title
    color #494949
    font-weight bold
    padding 15px 0 20px 0

.input-title
    color black
    border: 1px solid black
    padding 10px
    background #a5a5a5
    width calc(100% - 24px)

.input-body
    margin-top 15px
    color black
    background #a5a5a5
    box-sizing border-box
    border 1px solid black
    padding 10px
    width 100%
    height 170px
    resize none

.btn-container
    display flex
    flex-wrap wrap
    padding-bottom 10px

.offset
    flex-grow 1
</style>
