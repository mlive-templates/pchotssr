<template>
    <div>
        <div class="pic"></div>
    </div>
</template>

<script>
    export default {
        name: 'app',
        data: function () {
            return {}
        }
    }
</script>

<style lang="less" scoped>
    header {
        overflow: hidden;
    }

    .fr {
        float: right;
        padding-right: 20px;
        padding-top: 10px;
        color: #2345ff;
        cursor: pointer;
        font-size: 20px;
    }

    .pic {
        margin-top: 100px;
        background-image: url('../assets/image/logo.jpg');
        background-repeat: no-repeat;
        background-position: center center;
        height: 200px;
    }

    h1 {
        color: #f90;
        border-bottom: 2px blue solid;
        text-align: center;
        padding: 8px 0;
    }
</style>