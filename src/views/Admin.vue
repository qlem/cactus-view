import CactusType from "../http/cactusType";
<template>
    <div>
        <h2>Admin</h2>
        <div v-if="cactus">
            <h3>Edit cactus</h3>
            <edit-cactus :cactus="cactus"></edit-cactus>
        </div>
        <div v-else>
            <h3>Add a new cactus</h3>
            <add-cactus></add-cactus>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import AddCactus from '@/components/AddCactus.vue'
import EditCactus from '@/components/EditCactus.vue'
import CommonButton from '@/components/CommonButton.vue'

@Component({
    components: {
        CommonButton,
        AddCactus,
        EditCactus
    }
})
export default class Admin extends Vue {
    @Prop() private cactus!: any;
}
</script>

<style scoped lang="stylus">

</style>
