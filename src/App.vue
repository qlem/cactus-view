<template>
    <div id="app">
        <div class="header">Welcome to Cactus</div>
        <Navigation class="nav"/>
        <router-view class="content"/>
        <SignIn class="sign-in"/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { http } from "@/http/http";
import Navigation from '@/components/Navigation.vue'
import SignIn from '@/components/SignIn.vue'

@Component({
    components: {
        Navigation,
        SignIn
    }
})
export default class App extends Vue {
    created() {
        http.instance.interceptors.response.use(undefined, async (err: any) => {
            if (err.response && err.response.status === 401) {
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
    position fixed
    top 0
    left 0
    width 100%
    height 100%

.header
    background #494949
    position absolute
    height 65px
    width 100%
    color #d3d3d3
    z-index 1
    border-bottom: 1px solid #000000
    padding 35px 0 0 40px
    font-size 2em
    font-weight bold

.nav
    position absolute
    top 100px
    width 200px
    height calc(100% - 100px)

.content
    background #dbdbdb
    position absolute
    top 100px
    left 200px
    height calc(100% - 100px)
    width calc(100% - 280px)
    overflow auto
    padding 0 40px 0 40px

.sign-in
    z-index 2
    position absolute
    top 0
    right 0
</style>
