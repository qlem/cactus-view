<template>
    <div class="main">
        <router-link class="link" to="/">Home</router-link>
        <router-link class="link" to="/about">About</router-link>
        <router-link class="link" v-if="isAuth" to="/admin">Admin</router-link>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Navigation extends Vue {
    get isAuth() {
        return this.$store.getters.isAuth
    }
}
</script>

<style scoped lang="stylus">
.main
    background #494949
    display flex
    flex-direction column

.link
    color: white
    cursor pointer
    height 55px
    min-height 55px
    display flex
    justify-content center
    align-items center
    text-decoration none
    &.router-link-exact-active
        background-color: #4CAF50

.link:hover:not(.router-link-exact-active)
    background-color: #111

@media screen and (max-width: 700px)
    .link
        height 35px
        min-height 35px
        font-size 0.8em

</style>
