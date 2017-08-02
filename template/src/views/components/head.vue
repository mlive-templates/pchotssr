<template>
    <div class="head-wrap">
        <header>
            Bug管理系统
        </header>
        <div class="info">
            <div class="login" v-show="islogin">
                <span>name</span>
                <a href="javascript:;">注销</a>
            </div>
            <div class="logout" v-show="!islogin">
                <a href="javascript:;">登录</a>
                <a href="javascript:;">注册</a>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                islogin: false
            }
        },
        created() {

        }
    }
</script>
<style lang="less" scoped>
    .head-wrap {
        border-bottom: 1px solid #dfe2e6;
        background-color: #1e7dd7;
        overflow: hidden;
        padding: 25px 30px;
        color: #fff;
        header {
            float: left;
            font-size: 18px;
            font-weight: bold;
        }
        .info {
            float: right;
        }
        .login,
        .logout {
            a {
                margin-left: 10px;
                color: #fff;
                text-decoration: none;
            }
        }
    }
</style>