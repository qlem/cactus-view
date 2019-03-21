<template>
    <div>
        <div v-if="!isAuth" class="log-in">
            <input v-model="login" placeholder="pseudo or email"/>
            <input v-model="password" placeholder="password"/>
            <div @click="logIn">Sign In</div>
        </div>
        <div class="log-out" v-else @click="logOut">logout</div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class SignIn extends Vue {
    private login: string = '';
    private password: string = '';
    get isAuth() {
        return this.$store.getters.isAuth
    }
    private async logIn() {
        try {
            await this.$store.dispatch('authRequest', {
                data: {
                    login: this.login,
                    password: this.password
                }
            })
        } catch (e) {
            console.error('Cannot login');
            console.error(e)
        }
    }
    private async logOut() {
        try {
            this.$router.push('/');
            await this.$store.dispatch('authLogout')
        } catch (e) {
            console.error('Error detected while logout');
            console.error(e)
        }
    }
}
</script>

<style scoped>

</style>
