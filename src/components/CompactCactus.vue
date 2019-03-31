<template>
    <div class="main">
        <div class="title">{{ cactus.title }}</div>
        <flex-button :active="cactus.type === 'STD'" :marginLeft="true"
                     :text="'standard'" @click-on="$emit('update-type', 'STD')"></flex-button>
        <flex-button :active="cactus.type === 'ABOUT'" :marginLeft="true"
                     :text="'about'" @click-on="$emit('update-type', 'ABOUT')"></flex-button>
        <flex-button :active="cactus.type === 'CONTACT'" :marginLeft="true"
                     :text="'contact'" @click-on="$emit('update-type', 'CONTACT')"></flex-button>
        <flex-button :active="cactus.published" :marginLeft="true"
                     :text="'published'" @click-on="$emit('update-published')"></flex-button>
        <flex-button :marginLeft="true" :text="'edit'" @click-on="toEdit"></flex-button>
        <flex-button :marginLeft="true" :text="'delete'" @click-on="$emit('delete-cactus')"></flex-button>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import FlexButton from '@/components/FlexButton.vue'

@Component({
    components: {
        FlexButton
    }
})
export default class CompactCactus extends Vue {
    @Prop() private cactus: any;
    toEdit() {
        this.$router.push({
            name: 'addEditOne',
            params: {
                cactus: this.cactus
            }
        })
    }
}
</script>

<style scoped lang="stylus">
.title
    max-width 350px
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis

.main
    display flex
    align-items center
    flex-wrap wrap
</style>
