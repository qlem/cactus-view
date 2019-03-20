<template>
    <div id="app">
        <Nav class="nav"/>
        <SignIn v-if="!isAuth" class="sign-in"/>
        <div v-else @click="logOut">logout</div>
        <div>{{ isAuth }}</div>
        <div>{{ authStatus }}</div>
        <router-view class="content"/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Nav from '@/components/Navigation.vue'
import SignIn from '@/components/SignIn.vue'

@Component({
    components: {
        Nav,
        SignIn
    }
})
export default class App extends Vue {
    get isAuth() {
        return this.$store.getters.isAuth
    }
    get authStatus() {
        return this.$store.getters.authStatus
    }
    async logOut() {
        try {
            this.$router.push('/');
            await this.$store.dispatch('authLogout')
        } catch (e) {
            console.error('Error detected while logout');
            console.error(e.stack)
        }
    }
}
</script>

<style lang="stylus">
body
    margin 0
    padding 0
    width 100%
    height 100%

#app
    font-family 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    background #ffbf1d
    position fixed
    width 100%
    height 100%

.content
    height 100%
</style>
