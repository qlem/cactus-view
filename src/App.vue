<template>
    <div id="app">
        <div class="header">
            <h1>Welcome to Cactus</h1>
        </div>
        <Nav class="nav"/>
        <!-- <div>{{ authStatus }}</div> -->
        <router-view class="content"/>
        <SignIn class="sign-in"/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { http } from "@/http/http";
import Nav from '@/components/Navigation.vue'
import SignIn from '@/components/SignIn.vue'

@Component({
    components: {
        Nav,
        SignIn
    }
})
export default class App extends Vue {

    // TODO remove computed property
    get authStatus() {
        return this.$store.getters.authStatus
    }

    created() {
        http.instance.interceptors.response.use(undefined, async (err: any) => {
            if (err.response.status === 401) {
                await this.$store.dispatch('authLogout');
                this.$router.push('/');
            }
            return Promise.reject(err);
        })
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
    top 0
    left 0
    width 100%
    height 100%

.header
    position absolute
    height 100px
    h1
        margin-left 40px


.nav
    position absolute
    top 100px
    width 200px
    height calc(100% - 100px)

.content
    position absolute
    top 100px
    left 200px
    height calc(100% - 100px)
    width calc(100% - 200px)
    overflow auto

.sign-in
    position absolute
    top 0
    right 0
</style>
