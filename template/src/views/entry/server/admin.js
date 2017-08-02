import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import routerConfig from '../../page/admin/route'
import StoreFactory from '../../store/index'

import App from '../../page/admin'

import '../../assets/reset.css'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)

const store = StoreFactory({})

const router = new VueRouter({
    routerConfig
})

const app = new Vue({
    ...App,
    router,
    store
})
export default (context) => {
    return new Promise((resolve, reject) => {
        // context 携带数据
        context.state = store.state
        resolve(app)
    })
}