<template>
    <div class="main">
        <h2>Admin View</h2>
        <h2>Add a cactus</h2>
        <input v-model="title" placeholder="title"/>
        <input v-model="content" placeholder="content"/>
        <div @click="addCactus">Add</div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { http } from "@/http/http";

@Component
export default class Admin extends Vue {
    private title: string = '';
    private content: string = '';
    private async addCactus() {
        try {
            await http.instance.post('/blog', {
                data: {
                    title: this.title,
                    body: this.content
                }
            })
        } catch (e) {
            console.error('Cannot create a new cactus');
            console.error(e)
        }
    }
}
</script>

<style scoped lang="stylus">
.main
    background #12ff85
</style>
