/**
 * create time: 2017-07-16
 * fn: 路由配置
 */
const View = require('../controller/view')
const apiLogin = require('../controller/api/login')
const interceptors = require('./interceptors')

const config = {
    globalInterceptors: [interceptors.loginInterceptor],
    router: [{
        path: '/',
        interceptors: [],
        con: View.loginView
    }, {
        path: '/admin',
        con: View.default('admin')
    }, {
        path: '/api',
        children: [{
            path: 'login/login',
            method: 'post',
            con: apiLogin.login
        }, {
            path: 'login/logout',
            method: 'get',
            con: apiLogin.logout
        }]
    }]
}

module.exports = config