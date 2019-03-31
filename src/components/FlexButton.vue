<template>
    <div class="container">
        <div class="button" :class="{ active: active,  'margin-left': marginLeft }"
             @click="$emit('click-on')">{{ text }}</div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class CommonButton extends Vue {
    @Prop() readonly text!: string;
    @Prop() readonly active!: boolean;
    @Prop() readonly marginLeft!: boolean;
}
</script>

<style scoped lang="stylus">
.container
    display flex
    height 50px
    justify-content center
    align-items center
    align-content center

.button
    border: 1px solid black
    cursor pointer
    padding 5px 10px 5px 10px
    &:hover:not(.active)
        font-size 1.2em
        background #4CAF50
        transition .3s

.active
    background #4CAF50

.margin-left
    margin-left 5px
</style>
