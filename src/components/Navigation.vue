<template>
    <div class="nav">
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
        <router-link v-if="isAuth" to="/admin">Admin</router-link>
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

<style lang="stylus" scoped>
.nav
    background #b23cff
</style>
