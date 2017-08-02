import Vuex from 'vuex'

export default function StoreFactory(modules) {
    return new Vuex.Store({
        state: {
            userInfo: {
                name: 'mtime',
                email: 'xxxxxxxxx.@mtime.com'
            }
        },
        mutations: {

        },
        getters: {
            userInfo: state => state.userInfo
        },
        modules: modules || {}
    })
}