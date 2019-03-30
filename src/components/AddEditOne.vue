<template>
    <div>
        <h3 v-if="cactus._id">Edit cactus</h3>
        <h3 v-else>Add a new cactus</h3>
        <input class="input-title" type="text" v-model="cactus.title" placeholder="An another Cactus"/>
        <textarea class="input-body" v-model="cactus.body" placeholder="Lorem ipsum dolor sit amet..."></textarea>
        <div class="cactus-type">
            <input type="radio" id="uStd" value="STD" v-model="cactus.type">
            <label for="uStd">standard</label>
            <input type="radio" id="uAbout" value="ABOUT" v-model="cactus.type">
            <label for="uAbout">about</label>
            <input type="radio" id="uContact" value="CONTACT" v-model="cactus.type">
            <label for="uContact">contact</label>
        </div>
        <div class="cactus-published">
            <input type="checkbox" id="uPublished" v-model="cactus.published">
            <label for="uPublished">published ?</label>
        </div>
        <div class="button-container" v-if="cactus._id">
            <common-button text="cancel" @click-on="cancelEdit"></common-button>
            <common-button class="edit-button" text="edit" @click-on="editCactus"></common-button>
        </div>
        <div class="button-container" v-else>
            <common-button text="add" @click-on="addCactus"></common-button>
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
    async addCactus() {
        try {
            await http.addCactus(this.cactus);
            this.cactus.title = '';
            this.cactus.body = '';
            this.cactus.type = 'STD';
            this.cactus.published = true;
        } catch (e) {
            console.error('Cannot create a new cactus');
            console.error(e)
        }
    }
    async editCactus() {
        try {
            await http.editCactus({
                _id: this.cactus._id,
                title: this.cactus.title,
                body: this.cactus.body,
                type: this.cactus.type,
                published: this.cactus.published
            });
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
    height 200px
    resize none

.button-container
    display flex
    justify-content flex-end
    flex-direction row
    margin 10px 0 30px 0

.edit-button
    margin-left 10px

.cactus-type
    margin-top 10px

.cactus-published
    margin-top: 10px
</style>

