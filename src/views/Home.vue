<template>
    <div>
        <h2>Home</h2>
        <div class="cactus" v-for="post in posts" :key="post._id">
            <div class="cactus-admin" v-if="isAuth">
                <div class="admin-button" @click="toEditCactus(post)">
                    <img src="../assets/edit.png" alt="edit">
                </div>
                <div class="admin-button" @click="deleteCactus(post._id)">
                    <img src="../assets/trash.png" alt="delete">
                </div>
            </div>
            <div class="cactus-title">{{ post.title }}</div>
            <div class="cactus-author">by {{ post.author }}, {{ post.date }}</div>
            <div class="cactus-body">{{ post.body }}</div>
            <div class="cactus-last-edited" v-if="post.lastEdited">last edited by {{ post.lastEdited.author }}
                ({{ post.lastEdited.date }})</div>
        </div>
        <div class="margin-bottom"></div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import moment from 'moment';
import { http } from "@/http/http";

@Component
export default class Home extends Vue {
    private posts: any = [];
    get isAuth() {
        return this.$store.getters.isAuth
    }
    async created() {
        await this.getCactus()
    }
    async getCactus() {
        try {
            const response = await http.instance.get('/blog');
            for (let post of response.data) {
                post.date = moment(post.date).format('dddd, MMMM Do YYYY, h:mm:ss a');
                if (Object.keys(post.lastEdited).length > 0) {
                    post.lastEdited.date = moment(post.lastEdited.date).format('dddd, MMMM Do YYYY, h:mm:ss a');
                } else {
                    delete post.lastEdited
                }
            }
            this.posts = response.data;
        } catch (e) {
            console.error('Cannot get cactus');
            console.error(e)
        }
    }
    async deleteCactus(cactusId: string) {
        try {
            await http.instance.delete('/blog', {
                params: {
                    postId: cactusId
                }
            });
            await this.getCactus()
        } catch (e) {
            console.error('Cannot delete cactus');
            console.error(e);
        }
    }
    async toEditCactus(cactus: any) {
        this.$router.push({name: 'admin', params: {
            cactusId: cactus._id,
            pTitle: cactus.title,
            pBody: cactus.body
        }})
    }
}
</script>

<style scoped lang="stylus">
.cactus
    position relative
    background white
    width calc(100% - 20px)
    margin-bottom 20px
    padding 10px
    border-radius 2px
    box-shadow 3px 3px 6px 0 rgba(0, 0, 0, 0.2), -3px -3px 6px 0 rgba(0, 0, 0, 0.2)

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
    flex-grow 1
    font-weight bold
    color #4CAF50

.cactus-author
    font-size 0.7em
    margin-top 3px

.cactus-body
    margin-top 10px
    position relative

.cactus-last-edited
    font-style italic
    font-size 0.6em
    text-align right
    margin-top 10px

.margin-bottom
    height 20px
</style>
