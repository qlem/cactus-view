<template>
    <div>
        <h2>Admin</h2>
        <div v-for="tab in tabs" :key="tab" @click="currentTab = tab">{{ tab }}</div>
        <component v-if="cactus" :is="currentTabComponent" :cactus="cactus"></component>
        <component v-else :is="currentTabComponent" :cactus="newCactus"></component>

        <!-- <router-link class="link" to="/admin/one">One</router-link>
        <router-link class="link" to="/admin/two">Many</router-link>
        <router-view/> -->
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue} from 'vue-property-decorator';
import AddEditCactus from '@/components/AddEditOne.vue'
import CommonButton from '@/components/CommonButton.vue'
import EditManyCactus from '@/components/EditMany.vue'

@Component({
    components: {
        CommonButton,
        AddEditCactus,
        EditManyCactus
    }
})
export default class Admin extends Vue {
    @Prop() private cactus!: any;
    private currentTab: string = 'One';
    private tabs: string[] = ['One', 'Many'];
    get currentTabComponent() {
        if (this.currentTab === 'One') {
            return 'add-edit-cactus'
        }
        return 'edit-many-cactus'
    }
    private newCactus: any = {
        title: '',
        body: '',
        type: 'STD',
        published: true
    };
}
</script>

<style scoped lang="stylus">

</style>
