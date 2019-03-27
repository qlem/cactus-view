<template>
    <div>
        <h2>Log In</h2>
        <div class="container">
            <input class="input" type="text" v-model="username" placeholder="username"/>
            <input class="input" type="password" v-model="password" placeholder="password"/>
            <div class="button-container">
                <common-button text="cancel" @click-on="cancelLogin"></common-button>
                <common-button text="log in" @click-on="login"></common-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CommonButton from '@/components/CommonButton.vue'

@Component({
    components: {
        CommonButton
    }
})
export default class SignIn extends Vue {
    private username: string = '';
    private password: string = '';
    async login() {
        try {
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
    width 218px

.input
    margin-bottom 10px
    color black
    border: 2px solid black
    padding 10px
    background #a5a5a5
    width calc(100% - 24px)

.button-container
    display flex
    flex-direction row
    justify-content space-between
    margin-bottom 30
</style>
