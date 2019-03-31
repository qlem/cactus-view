<template>
    <div>
        <div class="cactus-admin" v-if="isAuth">
            <div class="admin-button" @click="toEdit(cactus)">
                <img src="../assets/edit.png" alt="edit">
            </div>
            <div class="admin-button" @click="deleteCactus(cactus._id)">
                <img src="../assets/trash.png" alt="delete">
            </div>
        </div>
        <div class="cactus-title">{{ cactus.title }}</div>
        <div class="cactus-author">by {{ cactus.author }}, {{ cactus.date }}</div>
        <div class="cactus-body">{{ cactus.body }}</div>
        <div class="cactus-last-edited" v-if="cactus.lastEdited.author">last edited by {{ cactus.lastEdited.author }}
            ({{ cactus.lastEdited.date }})</div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { http } from "@/http/http";

@Component
export default class Cactus extends Vue {
    @Prop() private cactus!: any;
    get isAuth() {
        return this.$store.getters.isAuth
    }
    async deleteCactus(cactusId: string) {
        try {
            await http.deleteCactus(cactusId);
            this.$emit('cactus-deleted')
        } catch (e) {
            console.error('Cannot delete cactus');
            console.error(e);
        }
    }
    toEdit(cactus: any) {
        this.$router.push({
            name: 'addEditOne',
            params: {
                cactus: cactus
            }
        })
    }
}
</script>

<style scoped lang="stylus">
.cactus-admin
    position absolute
    top 0
    right 0
    display flex

.admin-button
    margin 10px 10px 0 0
    img
        width 15px
        height 15px
    &:hover
        cursor pointer

.cactus-title
    font-size 1.3em
    font-weight bold
    color #4CAF50
    margin-right 50px
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis

.cactus-author
    font-size 0.7em
    margin-top 3px
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis

.cactus-body
    margin-top 15px

.cactus-last-edited
    font-style italic
    font-size 0.6em
    text-align right
    margin-top 10px
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis
</style>
