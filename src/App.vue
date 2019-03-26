<template>
    <div id="app">
        <div class="header">
            <div class="nav-button-container">
                <div class="nav-button" v-if="responsive" @click="showNav = !showNav"></div>
            </div>
            <div class="header-title">Welcome to Cactus</div>
        </div>
        <Navigation class="nav" v-show="responsive ? showNav : true"/>
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
    private responsive: boolean = false;
    private showNav: boolean = false;
    created() {
        http.instance.interceptors.response.use(undefined, async (err: any) => {
            if (err.response && err.response.status === 401) {
                await this.$store.dispatch('authLogout');
                this.$router.push('/');
            }
            return Promise.reject(err);
        });
    }
    mounted() {
        window.addEventListener('resize', this.resizeHandler);
        this.responsive = window.innerWidth <= 700;
    }
    beforeDestroy() {
        window.removeEventListener('resize', this.resizeHandler)
    }
    resizeHandler(event: any) {
        this.responsive = window.innerWidth <= 700;
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
    height 100px
    width 100%
    display flex
    border-bottom: 1px solid #000000
    z-index 1

.header-title
    color #d3d3d3
    font-size 2em
    font-weight bold
    display flex
    align-items flex-end
    padding 0 0 20px 40px

.nav-button-container
    display flex
    justify-content center
    align-items center

.nav-button
    display flex
    justify-content center
    align-items center
    margin 0 10px 0 10px
    width 35px
    height 35px
    cursor pointer
    background #ff494e

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
    position absolute
    top 0
    right 0
    z-index 2

@media screen and (max-width: 700px)
    .header
        height 50px

    .header-title
        font-size 1.5em
        padding 0
        align-items center

    .nav
        border-top: 1px solid #000000
        top 50px
        width 100px
        height calc(100% - 50px)
        z-index 1

    .content
        top 50px
        left 0
        width calc(100% - 40px)
        height calc(100% - 50px)
        padding 0 20px 0 20px
</style>
