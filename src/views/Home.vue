<template>
    <div class="home">
        <h1>Home View</h1>
        <div v-for="post in posts" :key="post._id">
            <div>{{ post.title }}</div>
            <div>{{ post.author }}</div>
            <div>{{ post.body }}</div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { http } from "@/http/http";

@Component
export default class Home extends Vue {
    private posts = [];
    async created() {
        try {
            const response = await http.instance.get('/blog');
            this.posts = response.data
        } catch (e) {
            console.error('Cannot get posts');
            console.error(e.stack)
        }
    }
}
</script>

<style scoped lang="stylus">
.home
    background #ff494e
</style>
