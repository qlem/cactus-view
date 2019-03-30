<template>
    <div>
        <input class="input-title" type="text" v-model="title" placeholder="An another Cactus"/>
        <textarea class="input-body" v-model="body" placeholder="Lorem ipsum dolor sit amet..."></textarea>
        <div>
            <input type="radio" id="std" value="STD" v-model="type">
            <label for="std">standard</label>
            <input type="radio" id="about" value="ABOUT" v-model="type">
            <label for="about">about</label>
            <input type="radio" id="contact" value="CONTACT" v-model="type">
            <label for="contact">contact</label>
        </div>
        <div>
            <input type="checkbox" id="published" v-model="published">
            <label for="published">published ?</label>
        </div>
        <div class="button-container">
            <common-button text="add" @click-on="addCactus"></common-button>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { http } from "@/http/http";
import CommonButton from '@/components/CommonButton.vue'

@Component({
    components: {
        CommonButton
    }
})
export default class Admin extends Vue {
    private title: string = '';
    private body: string = '';
    private type: string = 'STD';
    private published: boolean = true;
    async addCactus() {
        try {
            await http.addCactus({
                title: this.title,
                body: this.body,
                type: this.type,
                published: this.published
            });
            this.title = '';
            this.body = '';
        } catch (e) {
            console.error('Cannot create a new cactus');
            console.error(e)
        }
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
</style>
