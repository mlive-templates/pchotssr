<template>
    <div class="nav">
        <nav>
            <ul>
                <li class="item">
                    <router-link :to="{name: ''}">用户管理</router-link>
                </li>
                <li class="item">
                    <router-link :to="{name: ''}">应用程序</router-link>
                </li>
                <li class="item">
                    <router-link :to="{name: ''}">bug处理</router-link>
                </li>
                <li class="item">
                    <router-link :to="{name: ''}">邮件信息</router-link>
                </li>
            </ul>
        </nav>
    </div>
</template>
<style lang="less" scoped>
    .nav {
        float: left;
        text-align: center;
        width: 150px;
        min-height: calc(~'100vh - 69px');
        background: #efefef;
        ul li {
            padding: 15px 0;
            border-bottom: 1px #ccc solid;
            transition: all .3s;
        }
        a {
            text-decoration: none;
            color: black;
            display: block;
        }
        .item:hover {
            background: #ddd;
            a {
                color: #1e7dd7;
            }
        }
    }
</style>

<script>
    export default {
        data() {
            return {}
        },
        created() {}
    }
</script>