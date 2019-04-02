<template>
    <div>
        <h2>Home</h2>
        <div class="cactus-container" v-for="cactus in posts" :key="cactus._id">
            <cactus-preview :cactus="cactus" @click.native="toDetails(cactus)"></cactus-preview>
        </div>
        <div class="margin-bottom"></div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CactusPreview from '@/components/CactusPreview.vue';
import { http } from "@/http/http";
import CactusType from "@/http/cactusType";

@Component({
    components: {
        CactusPreview
    }
})
export default class Home extends Vue {
    private posts: any = [];
    async created() {
        await this.getCactus()
    }
    async getCactus() {
        try {
            this.posts = await http.getCactus(CactusType.STD);
        } catch (e) {
            console.error('Cannot get cactus');
            console.error(e)
        }
    }
    toDetails(cactus: any) {
        this.$router.push({
            name: 'details',
            params: {
                cactus: cactus
            }
        })
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
