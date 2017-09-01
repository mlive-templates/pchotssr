process.env.NODE_ENV = 'development'

const webpack = require('webpack')
const webpackIndexConfig = require('./webpack.index.conf')
const webpackServerConfig = require('./webpack.server.conf')

var packageInfo = require('./lib/packageInfo.js')
const dateUtil = require('./lib/dateUtil')

const chalk = require('chalk')
const ora = require('ora')
const spinner = ora('正在编译环境...')

const config = require('./config')
const port = config.dev.port
const uri = 'http://localhost:' + port
const opn = require('opn')
const autoOpenBrowser = !!config.dev.autoOpenBrowser
// 要缓存的中间件列表
const middlewareList = []
let web = null

packageInfo.copy().then(() => {
    Promise.all([compilerServer(), compilerClient()]).then((data) => {
        const clientData = data && data.length > 1 && data[1]
        return compilerIndex(clientData)
    }).catch(err => {
        console.log(err)
    })
}).catch((err) => {
    console.log(err)
    process.exit(0)
})

function compilerServer() {
    spinner.start()
    const tasks = webpackServerConfig.map(item => {
        return new Promise((resolve, reject) => {
            webpack(item).watch({}, (err, stats) => {
                if (err) {
                    spinner.stop()
                    formatLog('编译出现错误', 'red')
                    reject(stats.compilation.errors[0].message)
                } else {
                    formatLog('服务端bundles打包完成', 'cyan')
                    resolve()
                }
            })
        })
    })
    return Promise.all(tasks)
}

function compilerClient() {
    return new Promise((resolve, reject) => {
        const webpackConfig = require('./webpack.dev.conf')
        const compiler = webpack(webpackConfig)
        const devMiddleware = require('webpack-dev-middleware')(compiler, {
            publicPath: webpackConfig.output.publicPath,
            quiet: true
        })
        const hotMiddleware = require('webpack-hot-middleware')(compiler, {
            log: () => {},
            timeout: 2000,
            heartbeat: 1000
        })
        middlewareList.concat([devMiddleware, hotMiddleware])
        devMiddleware.waitUntilValid(() => {
            formatLog('客户端资源构建完毕', 'green')
            resolve(middlewareList)
            // compilerIndex(startApp, middlewareList)
        })
    })
}

function compilerIndex(ops) {
    return new Promise((resolve, reject) => {
        const compiler = webpack(webpackIndexConfig)
        compiler.watch({}, (err, stats) => {
            spinner.stop()
            if (err) {
                formatLog('Index 编译出现错误', 'red')
                reject(err)
            } else {
                startApp(ops)
                formatLog('Index 编译成功', 'green')
                resolve()
            }
        })
    })
}

function startApp(middlewareList) {
    if (!web) {
        web = require('../build/index')(middlewareList, function () {
            console.log(chalk.cyan('服务器开始运行: '))
            console.log(uri)
            if (autoOpenBrowser && process.env.NODE_ENV === 'development') {
                opn(uri)
            }
        })
    } else {
        web.close(function () {
            const mod = require.cache[require.resolve('../build/index')]
            delete require.cache[require.resolve('../build/index')]
            const ix = mod.parent.children.indexOf(mod)
            if (ix >= 0) mod.parent.children.splice(ix, 1)
            web = require('../build/index')(middlewareList, function () {
                console.log(chalk.green('web服务重新启动'))
            })
        })
    }
}

function formatLog(str, color) {
    console.log(chalk[color](`${dateUtil.formatDate('yyyy-MM-dd HH:mm:ss')}: ${str}!`))
}