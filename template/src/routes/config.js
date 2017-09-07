/**
 * create time: 2017-07-16
 * fn: 路由配置
 */
import View from '../controller/view'
import apiLogin from '../controller/api/login'
import interceptors from './interceptors'

const config = {
    globalInterceptors: [interceptors.loginInterceptor],
    router: [{
        path: '/',
        interceptors: [],
        con: View.loginView
    }, {
        path: '/admin',
        con: View.view('admin')
    }, {
        path: '/404',
        con: View.view('404')
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
    }, {
        path: '/test',
        con: View.simpleView('test')
    }]
}

export default config