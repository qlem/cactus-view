<template>
    <div>
        <router-link class="link" @click.native="$emit('click-on-link')" to="/">Home</router-link>
        <router-link class="link" @click.native="$emit('click-on-link')" to="/about">About</router-link>
        <router-link class="link" @click.native="$emit('click-on-link')" to="/contact">Contact</router-link>
        <router-link class="link" @click.native="$emit('click-on-link')" v-if="isAuth" to="/admin">Admin</router-link>
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
.link
    color: white
    cursor pointer
    height 55px
    display flex
    justify-content center
    align-items center
    text-decoration none
    &.router-link-exact-active
        background-color: #4CAF50

.link:hover:not(.router-link-exact-active)
    background-color: #111

@media screen and (max-width: 600px)
    .link
        height 40px
        font-size 0.8em

</style>
