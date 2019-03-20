<template>
    <div>
        <input v-model="login" placeholder="pseudo or email"/>
        <input v-model="password" placeholder="password"/>
        <div @click="signIn">Sign In</div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class SignIn extends Vue {
    private login: string = '';
    private password: string = '';
    private async signIn() {
        try {
            await this.$store.dispatch('authRequest', {
                data: {
                    login: this.login,
                    password: this.password
                }
            })
        } catch (e) {
            console.error('Cannot login');
            console.error(e.stack)
        }
    }
}
</script>

<style scoped>

</style>
