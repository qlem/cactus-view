<template>
    <div>
        <h2>Admin</h2>
        <router-link class="link" :to="{
                        name: 'addEditOne',
                        params: {
                            cactus: {
                                title: '',
                                body: '',
                                type: 'STD',
                                published: true
                            }
                        }
                     }">One</router-link>
        <router-link class="link" :to="{ name: 'editMany' }">Many</router-link>
        <router-view/>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class Admin extends Vue {
    /* @Prop() private cactus: any;
    created() {
        this.$router.push({
            name: 'addEditOne',
            params: {
                cactus: this.cactus
            }
        })
    } */
}
</script>

<style scoped lang="stylus">
.link
    cursor pointer
    text-decoration none
    &.active
        background-color: #4CAF50
    &:hover:not(.active)
        background-color: #111
</style>
