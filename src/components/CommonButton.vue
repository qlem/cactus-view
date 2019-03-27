<template>
    <div class="button" @click="$emit('click-on')">{{ text }}</div>
</template>

<script lang="ts">
import { Component, Prop, Vue} from 'vue-property-decorator'

@Component
export default class CommonButton extends Vue {
    @Prop() private text!: string;
}
</script>

<style scoped lang="stylus">
.button
    text-align center
    color white
    width 100px
    background #409643
    padding 10px 0 10px 0
    border 2px solid black
    &:hover
        cursor pointer
        background #4CAF50
</style>
