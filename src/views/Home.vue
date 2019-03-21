<template>
    <div class="home">
        <h2 class="main-title">Home View</h2>
        <div v-for="post in posts" :key="post._id" class="cactus">
            <div class="cactus-title">{{ post.title }}</div>
            <div class="cactus-date">{{ post.date }}</div>
            <div class="cactus-author">{{ post.author }}</div>
            <div class="cactus-body">{{ post.body }}</div>
            <div class="cactus-last-edited" v-if="post.lastEdited">last edited by {{ post.lastEdited.author }}
                ({{ post.lastEdited.date }})</div>
            <div v-if="isAuth" class="delete-button" @click="deleteCactus(post._id)">delete</div>
        </div>
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
    private async created() {
        await this.getCactus()
    }
    private async getCactus() {
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
            console.error('Cannot get posts');
            console.error(e)
        }
    }
    private async deleteCactus(postId: string) {
        try {
            await http.instance.delete('/blog', {
                params: {
                    postId: postId
                }
            });
            await this.getCactus()
        } catch (e) {
            console.error('Cannot delete cactus');
            console.error(e);
        }
    }
}
</script>

<style scoped lang="stylus">
.home
    background #ff494e

.main-title
    margin-left 40px

.cactus
    margin 0 40px 20px 40px

.cactus-title
    font-weight bold
    font-size 1.2em
</style>
