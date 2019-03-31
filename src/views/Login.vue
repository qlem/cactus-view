<template>
    <div>
        <h2>Log In</h2>
        <div class="container">
            <input class="input" type="text" v-model="username" placeholder="username"/>
            <input class="input" type="password" v-model="password" placeholder="password"/>
            <div class="button-container">
                <flex-button :text="'cancel'" @click-on="cancelLogin"></flex-button>
                <flex-button :text="'log in'" @click-on="login"></flex-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import FlexButton from '@/components/FlexButton.vue'

@Component({
    components: {
        FlexButton
    }
})
export default class SignIn extends Vue {
    private username: string = '';
    private password: string = '';
    async login() {
        try {
            if (this.username === '' || this.password === '') {
                return
            }
            await this.$store.dispatch('authRequest', {
                data: {
                    login: this.username,
                    password: this.password
                }
            });
            this.$router.go(-1)
        } catch (e) {
            console.error('Login error');
            console.error(e)
        }
    }
    cancelLogin() {
        this.$router.go(-1)
    }
}
</script>

<style scoped lang="stylus">
.container
    width 200px

.input
    margin-bottom 10px
    color black
    border: 1px solid black
    padding 10px
    background #a5a5a5
    width calc(100% - 24px)

.button-container
    display flex
    justify-content space-around
    margin-bottom 10px
</style>
