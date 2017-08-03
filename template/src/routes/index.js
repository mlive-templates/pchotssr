/**
 * create time: 2017-07-14
 * fn: 路由入口文件，所有路由在这里加载
 */

const express = require('express')
const router = express.Router()
const routerConfig = require('./config')
// const render = require('../template')
const common = require('../common/common')

// 根据config 配置路由
function parseRouter(router) {
    const rootRouterConfig = routerConfig.router
    const globalInterceptors = routerConfig.globalInterceptors
    if (rootRouterConfig && rootRouterConfig.length > 0) {
        handle(router, rootRouterConfig)
    }

    function handle(router, config) {
        config.forEach((item) => {
            if (!item.path) return
            if (item.con) {
                const method = item.method || 'all'
                const interceptors = item.interceptors || globalInterceptors
                router[method](item.path, ...interceptors, item.con)
            }
            if (item.children && item.children.length > 0) {
                const subrouter = express.Router()
                router.use(item.path, subrouter)
                handle(subrouter, item.children)
            }
        })
    }
}

parseRouter(router)
// return
// 500 error
router.use((err, req, res, next) => {
    console.log(err)
    if (process.env.NODE_ENV === 'production') {
        // 记录到错误收集平台
        err = '应用程序内部错误'
    }
    res.format({
        'text/html': function () {
            res.redirect('/404')
            // res.status(500).send(render.renderError())
        },
        'application/json': function () {
            return res.status(500).json(common.answer(false, err))
        },
        'default': function () {
            res.redirect('/404')
        }
    })
})
router.use('*', (req, res) => {
    const payload = {
        url: req.originalUrl,
        error: 'Not found'
    }
    res.format({
        'text/html': function () {
            res.redirect('/404')
        },
        'application/json': function () {
            return res.status(404).json(payload)
        },
        'default': function () {
            res.redirect('/404')
        }
    })
})

module.exports = router