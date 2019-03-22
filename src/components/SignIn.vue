<template>
    <div>
        <div v-if="!isAuth">
            <div class="log-label-container">
                <div class="log-label" @click="swapLogin">{{ logInLabel }}</div>
            </div>
            <div class="log-in-container" v-show="show">
                <input type="text" class="input" v-model="login" placeholder="pseudo"/>
                <input type="password" class="input" v-model="password" placeholder="password"/>
                <div class="sign-in-button" @click="logIn">in</div>
            </div>
        </div>
        <div v-else class="log-label" @click="logOut">logout</div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class SignIn extends Vue {
    private logInLabel: string = 'login';
    private show: boolean = false;
    private login: string = '';
    private password: string = '';
    get isAuth() {
        return this.$store.getters.isAuth
    }
    async logIn() {
        try {
            await this.$store.dispatch('authRequest', {
                data: {
                    login: this.login,
                    password: this.password
                }
            });
            this.swapLogin()
        } catch (e) {
            console.error('Cannot login');
            console.error(e)
        }
    }
    async logOut() {
        try {
            this.$router.push('/');
            await this.$store.dispatch('authLogout')
        } catch (e) {
            console.error('Error detected while logout');
            console.error(e)
        }
    }
    swapLogin() {
        this.show = !this.show;
        if (this.show) {
            this.logInLabel = 'cancel'
        } else {
            this.logInLabel = 'login'
        }
    }
}
</script>

<style scoped lang="stylus">
.log-label-container
    display flex
    justify-content flex-end

.log-label
    margin 10px 10px 0 0
    cursor pointer
    display flex
    justify-content flex-end
    &:hover
        color #d3d3d3

.log-in-container
    margin-top 10px
    display flex

.input
    border-radius 2px 2px 0 0
    border: none
    border-bottom 2px solid #4CAF50
    margin 0 10px 0 0
    padding 5px
    background #191919
    color #d3d3d3

.sign-in-button
    display flex
    justify-content center
    align-items center
    color white
    border-radius 2px
    width 27px
    background #191919
    margin-right 10px
    border 2px solid #4CAF50
    &:hover
        background #4CAF50
        cursor pointer
</style>
