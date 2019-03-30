<template>
    <div>
        <h2>Contact</h2>
        <div class="cactus-container" v-for="item in cactus" :key="item._id">
            <cactus :cactus="item" @cactus-deleted="getCactus"></cactus>
        </div>
        <div class="margin-bottom"></div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { http } from "@/http/http";
import CactusType from '@/http/cactusType'
import Cactus from "@/components/Cactus.vue";

@Component({
    components: {
        Cactus
    }
})
export default class Contact extends Vue {
    private cactus: any = [];
    async created() {
        await this.getCactus()
    }
    async getCactus() {
        try {
            this.cactus = await http.getCactus(CactusType.CONTACT);
        } catch (e) {
            console.error('Cannot get cactus');
            console.error(e)
        }
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
