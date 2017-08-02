<template>
    <div>
        <head-top></head-top>
        <my-menu></my-menu>
        <div class="content">
            <el-button type="primary" icon="search">搜索</el-button>
            <router-view></router-view>
        </div>
    </div>
</template>
<style lang="less">
    .content {
        overflow: hidden;
        padding-left: 8px;
    }
</style>

<script>
    import {
        mapGetters
    } from 'vuex'
    import headTop from '../../components/head.vue'
    import myMenu from './menu.vue'

    export default {
        computed: {
            ...mapGetters([
                'userInfo'
            ])
        },
        components: {
            headTop,
            myMenu
        }
    }
</script>