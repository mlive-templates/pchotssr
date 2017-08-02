<template>
    <div id="app">
        <headtop></headtop>
        <app></app>
    </div>
</template>

<script>
    import headtop from '../../components/head.vue'
    import app from '../App.vue'
    export default {
        data() {
            return {}
        },
        components: {
            headtop,
            app
        }
    }
</script>