<template>
    <div>
        <h2>Admin</h2>
        <div v-if="cactusId">
            <h3>Edit cactus</h3>
            <input class="input-title" type="text" v-model="uTitle" placeholder="An another Cactus"/>
            <textarea class="input-body" v-model="uBody" placeholder="Lorem ipsum dolor sit amet..."></textarea>
            <div class="button-container">
                <common-button text="cancel" @click-on="cancelEdit"></common-button>
                <common-button class="edit-button" text="edit" @click-on="editCactus"></common-button>
            </div>
        </div>
        <div v-else>
            <h3>Add a new cactus</h3>
            <input class="input-title" type="text" v-model="title" placeholder="An another Cactus"/>
            <textarea class="input-body" v-model="body" placeholder="Lorem ipsum dolor sit amet..."></textarea>
            <div class="button-container">
                <common-button text="add" @click-on="addCactus"></common-button>
            </div>
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
    @Prop() private cactusId!: string;
    @Prop() private pTitle!: string;
    @Prop() private pBody!: string;
    private title: string = '';
    private body: string = '';
    private uTitle = this.pTitle;
    private uBody = this.pBody;
    async addCactus() {
        try {
            await http.instance.post('/blog', {
                data: {
                    title: this.title,
                    body: this.body
                }
            });
            this.title = '';
            this.body = '';
        } catch (e) {
            console.error('Cannot create a new cactus');
            console.error(e)
        }
    }
    async editCactus() {
        try {
            await http.instance.put('/blog', {
                data: {
                    _id: this.cactusId,
                    title: this.uTitle,
                    body: this.uBody
                }
            });
            this.$router.push('/')
        } catch (e) {
            console.error('Cannot edit cactus');
            console.error(e)
        }
    }
    async cancelEdit() {
        this.uTitle = '';
        this.uBody = '';
        this.$router.push('/')
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
