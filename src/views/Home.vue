<template>
    <div>
        <h2>Home</h2>
        <div class="cactus-container" v-for="post in posts" :key="post._id">
            <cactus :cactus="post" @edit-cactus="toEditCactus($event)" @delete-cactus="deleteCactus($event)"></cactus>
        </div>
        <div class="margin-bottom"></div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { http } from "@/http/http";
import moment from 'moment';
import Cactus from "@/components/Cactus.vue";

@Component({
    components: {
        Cactus
    }
})
export default class Home extends Vue {
    private posts: any = [];
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
    toEditCactus(cactus: any) {
        this.$router.push({name: 'admin', params: {
            cactusId: cactus._id,
            pTitle: cactus.title,
            pBody: cactus.body
        }})
    }
}
</script>

<style scoped lang="stylus">
.cactus-container
    position relative
    background white
    width calc(100% - 20px)
    margin-bottom 20px
    padding 10px
    border-radius 2px
    box-shadow 3px 3px 6px 0 rgba(0, 0, 0, 0.2), -3px -3px 6px 0 rgba(0, 0, 0, 0.2)

.margin-bottom
    height 20px
</style>
