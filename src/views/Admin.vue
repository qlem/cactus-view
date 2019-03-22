<template>
    <div class="main">
        <h2>Admin</h2>
        <h3 v-if="cactusId">Edit cactus</h3>
        <h3 v-else>Add a new cactus</h3>
        <div v-if="cactusId">
            <input class="input-title" type="text" v-model="uTitle" placeholder="An another Cactus"/>
            <textarea class="input-body" v-model="uBody" placeholder="Lorem ipsum dolor sit amet..."></textarea>
        </div>
        <div v-else>
            <input class="input-title" type="text" v-model="title" placeholder="An another Cactus"/>
            <textarea class="input-body" v-model="body" placeholder="Lorem ipsum dolor sit amet..."></textarea>
        </div>
        <div v-if="cactusId" class="button-container">
            <div class="button" @click="editCactus">Edit</div>
            <div class="offset"></div>
            <div class="button" @click="cancelEdit">Cancel</div>
        </div>
        <div class="button-container" v-else>
            <div class="button" @click="addCactus">Add</div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { http } from "@/http/http";

@Component
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

.button
    text-align center
    color white
    width 100px
    background #409643
    padding 10px 0 10px 0
    border 2px solid black
    &:hover
        cursor pointer
        background #4CAF50

.offset
    width 10px
</style>
