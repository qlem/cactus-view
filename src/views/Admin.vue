import CactusType from "../http/cactusType";
<template>
    <div>
        <h2>Admin</h2>
        <div v-if="cactus">
            <h3>Edit cactus</h3>
            <add-edit-cactus :cactus="cactus"></add-edit-cactus>
        </div>
        <div v-else>
            <h3>Add a new cactus</h3>
            <add-edit-cactus :cactus="newCactus"></add-edit-cactus>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import AddEditCactus from '@/components/AddEditCactus.vue'
import CommonButton from '@/components/CommonButton.vue'

@Component({
    components: {
        CommonButton,
        AddEditCactus
    }
})
export default class Admin extends Vue {
    @Prop() private cactus!: any;
    private newCactus: any = {
        title: '',
        body: '',
        type: 'STD',
        published: true
    }
}
</script>

<style scoped lang="stylus">

</style>
