<template>
    <div>
        <h2>Admin</h2>
        <router-link class="link" :to="{ name: 'addEditOne' }">One</router-link>
        <router-link class="link" :to="{ name: 'editMany' }">Many</router-link>
        <router-view/>
    </div>
</template>

<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';

@Component
export default class Admin extends Vue {

}
</script>

<style scoped lang="stylus">
.link
    cursor pointer
    text-decoration none
    &.exact-active
        background-color: #4CAF50
    &:hover:not(.exact-active)
        background-color: #111
</style>
