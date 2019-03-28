<template>
    <div id="app" @click="clickHandler">
        <div class="header">
            <div class="nav-button-container" v-if="responsive" @click.stop="showNav = !showNav">
                <!-- TODO remake that button -->
                <img class="nav-button" src="./assets/menu.png" alt="menu">
            </div>
            <div class="header-title" v-if="!responsive">Welcome to Cactus</div>
        </div>
        <transition name="slide">
            <Navigation class="nav" v-show="responsive ? showNav : true" @click-on-link="flipNav"/>
        </transition>
        <router-view class="content"/>
        <div v-if="!isAuth" class="log-button" @click="logIn">login</div>
        <div v-else class="log-button" @click="logOut">logout</div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { http } from "@/http/http";
import Navigation from '@/components/Navigation.vue'

@Component({
    components: {
        Navigation
    }
})
export default class App extends Vue {
    private responsive: boolean = false;
    private showNav: boolean = false;
    get isAuth() {
        return this.$store.getters.isAuth
    }
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
        this.responsive = window.innerWidth <= 600;
    }
    beforeDestroy() {
        window.removeEventListener('resize', this.resizeHandler)
    }
    resizeHandler() {
        this.responsive = window.innerWidth <= 600;
    }
    flipNav() {
        if (this.responsive && this.showNav) {
            return this.showNav = !this.showNav
        }
    }
    logIn() {
        this.$router.push('login')
    }
    async logOut() {
        try {
            this.$router.push('/');
            await this.$store.dispatch('authLogout')
        } catch (e) {
            console.error('Logout error');
            console.error(e)
        }
    }
    clickHandler() {
        if (this.responsive && this.showNav) {
            this.showNav = false;
        }
    }
}
</script>

<style lang="stylus">
@import url('https://fonts.googleapis.com/css?family=Montserrat');

body
    margin 0
    padding 0
    width 100%
    height 100%

#app
    // font-family 'Avenir', Helvetica, Arial, sans-serif
    font-family: 'Montserrat', sans-serif
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
    cursor pointer
    width 50px
    &:hover
        background #4CAF50

.nav-button
    width 30px
    height 30px

.nav
    background #494949
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
    h2, h3
        color #494949

.log-button
    position absolute
    top 0
    right 0
    margin 10px 10px 0 0
    cursor pointer
    display flex
    justify-content flex-end
    z-index 2
    &:hover
        color #d3d3d3

@media screen and (max-width: 600px)
    .header
        height 50px

    .nav
        border-top: 1px solid #000000
        top 50px
        width 150px
        height calc(100% - 50px)
        z-index 1
        box-shadow 3px 3px 6px 0 rgba(0, 0, 0, 0.3)

    .content
        top 50px
        left 0
        width calc(100% - 40px)
        height calc(100% - 50px)
        padding 0 20px 0 20px

    .slide-leave-active
        animation: close .4s linear

    .slide-enter-active
        animation: open .4s linear

    @keyframes close
        from
            left: 0
        to
            left: -150px

    @keyframes open
        from
            left: -150px
        to
            left: 0
</style>
