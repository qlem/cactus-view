<template>
    <div>
        <input class="input-title" type="text" v-model="title" placeholder="An another Cactus"/>
        <textarea class="input-body" v-model="body" placeholder="Lorem ipsum dolor sit amet..."></textarea>
        <div>
            <input type="radio" id="uStd" value="STD" v-model="type">
            <label for="uStd">standard</label>
            <input type="radio" id="uAbout" value="ABOUT" v-model="type">
            <label for="uAbout">about</label>
            <input type="radio" id="uContact" value="CONTACT" v-model="type">
            <label for="uContact">contact</label>
        </div>
        <div>
            <input type="checkbox" id="uPublished" v-model="published">
            <label for="uPublished">published ?</label>
        </div>
        <div class="button-container">
            <common-button text="cancel" @click-on="cancelEdit"></common-button>
            <common-button class="edit-button" text="edit" @click-on="editCactus"></common-button>
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
    async editCactus() {
        try {
            await http.editCactus({
                _id: this.cactus._id,
                title: this.title,
                body: this.body,
                type: this.type,
                published: this.published
            });
            this.$router.push('/')
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
    height 200px
    resize none

.button-container
    display flex
    justify-content flex-end
    flex-direction row
    margin 10px 0 30px 0

.edit-button
    margin-left 10px
</style>

