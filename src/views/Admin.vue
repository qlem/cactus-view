<template>
    <div class="main">
        <h2>Admin</h2>
        <div class="link-container">
            <router-link class="link" :to="{ name: 'addEditOne' }">One</router-link>
            <router-link class="link link-two" :to="{ name: 'editMany' }">Many</router-link>
        </div>
        <router-view class="sub-content"/>
        <div class="margin-bottom"></div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Admin extends Vue {

}
</script>

<style scoped lang="stylus">
.link-container
    display flex
    flex-direction row
    border-radius 2px 2px 0 0
    box-shadow -3px -3px 6px 0 rgba(0, 0, 0, 0.2), 3px 0px 6px 0 rgba(0, 0, 0, 0.2)

.link
    color black
    background rgb(230, 230, 230)
    width 100px
    cursor pointer
    text-decoration none
    border-radius 2px 0 0 0
    padding 5px 0 5px 20px
    &.exact-active
        background white
    &:hover:not(.exact-active)
        background white

.link-two
    flex-grow 1
    border-radius 0 2px 0 0

.sub-content
    background white
    border-top 1px solid black
    padding 0 20px 0 20px
    border-radius 0 0 2px 2px
    box-shadow 3px 3px 6px 0 rgba(0, 0, 0, 0.2), -3px -3px 6px 0 rgba(0, 0, 0, 0.2)

.margin-bottom
    height 20px
</style>
