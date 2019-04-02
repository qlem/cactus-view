<template>
    <div class="main">
        <div class="cactus-title">{{ cactus.title }}</div>
        <div class="cactus-author">by {{ cactus.author }}, {{ cactus.date }}</div>
        <div class="cactus-body">{{ body }}</div>
        <div class="cactus-last-edited" v-if="cactus.lastEdited.author">last edited by {{ cactus.lastEdited.author }}
            ({{ cactus.lastEdited.date }})</div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Cactus extends Vue {
    @Prop() private cactus!: any;
    get body() {
        if (this.cactus.body.length >= 400) {
            let subBody: string = this.cactus.body.substring(0, 400);
            while (subBody[subBody.length - 1] === ' ') {
                subBody = subBody.substring(0, subBody.length - 1)
            }
            return subBody + '...'
        }
        return this.cactus.body
    }
}
</script>

<style scoped lang="stylus">
.main
    background white
    display flex
    flex-direction column
    min-width 280px
    max-width 600px
    margin 0 20px 20px 0
    padding 10px
    border-radius 2px
    box-shadow 3px 3px 6px 0 rgba(0, 0, 0, 0.2), -3px -3px 6px 0 rgba(0, 0, 0, 0.2)
    &:hover
        cursor pointer

.cactus-title
    font-size 1.3em
    font-weight bold
    color #4CAF50
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis

.cactus-author
    font-size 0.7em
    margin-top 3px
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis

.cactus-body
    margin-top 15px

.cactus-last-edited
    font-style italic
    font-size 0.6em
    text-align right
    margin-top 10px
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis

@media screen and (max-width: 930px)
    .main
        width 100%
        min-width 0
        max-width none
        margin-right 0
</style>
