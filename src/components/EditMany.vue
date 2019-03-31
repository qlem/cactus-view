<template>
    <div>
        <div>
            <div class="title-cat">Home</div>
            <div v-for="item in cactus" :key="item._id">
                <compact-cactus v-if="item.type === 'STD'" :cactus="item"
                                @update-type="updateType(item, $event)"
                                @update-published="updatePublished(item, !item.published)"
                                @delete-cactus="deleteCactus(item._id)"></compact-cactus>
            </div>
        </div>
        <div>
            <div class="title-cat">About</div>
            <div v-for="item in cactus" :key="item._id">
                <compact-cactus v-if="item.type === 'ABOUT'" :cactus="item"
                                @update-type="updateType(item, $event)"
                                @update-published="updatePublished(item, !item.published)"
                                @delete-cactus="deleteCactus(item._id)"></compact-cactus>
            </div>
        </div>
        <div>
            <div class="title-cat">Contact</div>
            <div v-for="item in cactus" :key="item._id">
                <compact-cactus v-if="item.type === 'CONTACT'" :cactus="item"
                                @update-type="updateType(item, $event)"
                                @update-published="updatePublished(item, !item.published)"
                                @delete-cactus="deleteCactus(item._id)"></compact-cactus>
            </div>
        </div>
        <div class="margin-bottom"></div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { http } from "@/http/http";
import CactusType from '@/http/cactusType'
import CompactCactus from '@/components/CompactCactus.vue'

@Component({
    components: {
        CompactCactus
    }
})
export default class EditManyCactus extends Vue {
    private cactus: any = [];
    async created() {
        await this.getCactus();
    }
    async getCactus() {
        try {
            this.cactus = await http.getCactus(CactusType.ALL);
        } catch (e) {
            console.error('Cannot get cactus');
            console.error(e)
        }
    }
    async updateType(cactus: any, type: string) {
        try {
            if (cactus.type === type) {
                return
            }
            await http.editCactus({
                _id: cactus._id,
                type: type
            });
            await this.getCactus();
        } catch (e) {
            console.error('Cannot update cactus type');
            console.error(e)
        }
    }
    async updatePublished(cactus: any, state: boolean) {
        try {
            await http.editCactus({
                _id: cactus._id,
                published: state
            });
            await this.getCactus();
        } catch (e) {
            console.error('Cannot update cactus published state');
            console.error(e)
        }
    }
    async deleteCactus(id: string) {
        try {
            await http.deleteCactus(id);
            await this.getCactus();
        } catch (e) {
            console.error('Cannot delete cactus');
            console.error(e);
        }
    }
}
</script>

<style scoped lang="stylus">
.title-cat
    color #494949
    font-weight bold
    padding 20px 0 10px 0

.margin-bottom
    height 20px
</style>
