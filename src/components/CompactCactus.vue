<template>
    <div class="main">
        <div class="title">{{ cactus.title }}</div>
        <div class="box" :class="{ active: cactus.type === 'STD' }"
             @click="$emit('update-type', 'STD')">standard</div>
        <div class="box" :class="{ active: cactus.type === 'ABOUT' }"
             @click="$emit('update-type', 'ABOUT')">about</div>
        <div class="box" :class="{ active: cactus.type === 'CONTACT' }"
             @click="$emit('update-type', 'CONTACT')">contact</div>
        <div class="box" :class="{ active: cactus.published }"
             @click="$emit('update-published')">published</div>
        <div class="box" @click="toEdit(cactus)">edit</div>
        <div class="box" @click="$emit('delete-cactus')">delete</div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class CompactCactus extends Vue {
    @Prop() private cactus: any;
    toEdit(cactus: any) {
        this.$router.push({
            name: 'addEditOne',
            params: {
                cactus: cactus
            }
        })
    }
}
</script>

<style scoped lang="stylus">
.main
    display flex
    height 50px
    align-items center

.box
    border: 1px solid #000000
    margin 0 5px 0 5px
    padding 5px
    cursor pointer
    &:hover:not(.active)
        font-size 1.2em
        background #4CAF50
        transition .3s

.active
    background #4CAF50
</style>
