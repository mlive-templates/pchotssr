import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import StoreFactory from '../../store/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import routerConfig from '../../page/admin/route'
import App from '../../page/admin'

import '../../assets/reset.css'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)

const store = StoreFactory({})

const router = new VueRouter({
    routerConfig
})
if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__)
}
new Vue({
    el: '#app',
    router,
    store,
    extends: App
})