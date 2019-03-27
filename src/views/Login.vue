<template>
    <div>
        <h2>Log In</h2>
        <div class="container">
            <input class="input" type="text" v-model="username" placeholder="username"/>
            <input class="input" type="password" v-model="password" placeholder="password"/>
            <div class="button-container">
                <common-button text="Cancel" @click-on="cancelLogin"></common-button>
                <div class="offset"></div>
                <common-button text="Log In" @click-on="login"></common-button>
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
    margin-top 20px
    color black
    border: 2px solid black
    padding 10px
    background #a5a5a5
    width calc(100% - 24px)

.button-container
      display flex
      justify-content flex-end
      flex-direction row
      margin 20px 0 30px 0

.offset
    width 10px
</style>
