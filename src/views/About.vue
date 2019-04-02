<template>
    <div>
        <h2>About</h2>
        <div class="cactus-container">
            <cactus-preview v-for="cactus in posts" :key="cactus._id" :cactus="cactus"
                            @click.native="toDetails(cactus)"></cactus-preview>
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
export default class About extends Vue {
    private posts: any = [];
    async created() {
        await this.getCactus()
    }
    async getCactus() {
        try {
            this.posts = await http.getCactus(CactusType.ABOUT);
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
    display flex
    flex-wrap wrap

.margin-bottom
    height 20px
</style>
