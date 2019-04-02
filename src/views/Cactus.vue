<template>
    <div>
        <div class="container">
            <div class="cactus-title">{{ cactus.title }}</div>
            <div class="cactus-author">by {{ cactus.author }}, {{ cactus.date }}</div>
            <div class="cactus-body">{{ cactus.body }}</div>
            <div class="cactus-last-edited" v-if="cactus.lastEdited.author">last edited by {{ cactus.lastEdited.author }}
                ({{ cactus.lastEdited.date }})</div>
            <div class="admin-button" v-if="isAuth">
                <flex-button :text="'edit'" @click-on="toEdit(cactus)"></flex-button>
                <flex-button :text="'delete'" :marginLeft="true" @click-on="deleteCactus(cactus._id)"></flex-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import FlexButton from '@/components/FlexButton.vue'
import { http } from "@/http/http";

@Component({
    components: {
        FlexButton
    }
})
export default class CactusFullView extends Vue {
    @Prop() private cactus: any;
    get isAuth() {
        return this.$store.getters.isAuth
    }
    async deleteCactus(cactusId: string) {
        try {
            await http.deleteCactus(cactusId);
            this.$router.go(-1)
        } catch (e) {
            console.error('Cannot delete cactus');
            console.error(e);
        }
    }
    toEdit(cactus: any) {
        this.$router.push({
            name: 'addEditOne',
            params: {
                cactus: cactus
            }
        })
    }
}
</script>

<style scoped lang="stylus">
.container
    display grid
    grid-template-columns 15% auto 15%
    grid-template-rows min-height min-height min-height min-height min-height
    grid-template-areas "left title right" "left author right" "left body right" "left last-edited right" "left admin right"

.cactus-title
    margin 30px 0 5px 0
    grid-area title
    font-size 1.6em
    font-weight bold
    color #4CAF50

.cactus-author
    margin-bottom 30px
    grid-area author
    font-size 0.8em

.cactus-body
    margin-bottom 30px
    grid-area body

.cactus-last-edited
    grid-area last-edited
    font-style italic
    font-size 0.6em
    text-align right

.admin-button
    grid-area admin
    display flex
    margin-bottom 30px

@media screen and (max-width: 1000px)
    .container
        grid-template-columns 5% auto 5%
</style>

