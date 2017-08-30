process.env.NODE_ENV = 'development'

const webpack = require('webpack')
const webpackIndexConfig = require('./webpack.index.conf')
const webpackServerConfig = require('./webpack.server.conf')

var packageInfo = require('./lib/packageInfo.js')
const dateUtil = require('./lib/dateUtil')

const path = require('path')
const chalk = require('chalk')
const ora = require('ora')
const spinner = ora('正在编译环境...')
const cp = require('child_process')

let n

packageInfo.copy().then(() => {
    compilerServer().then(() => {
        formatLog('服务端编译完成', 'green')
        comilerIndex()
    }, err => {
        console.log(chalk.red('服务端编译出错!'))
        console.log(err)
    })
}).catch((err) => {
    console.log(err)
    process.exit(0)
})

function formatLog(str, color) {
    console.log(chalk[color](`${dateUtil.formatDate('yyyy-MM-dd HH:mm:ss')}: ${str}!`))
}

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

function comilerIndex() {
    const compiler = webpack(webpackIndexConfig)

    compiler.watch({}, (err, stats) => {
        spinner.stop()
        if (err) {
            formatLog('编译出现错误', 'red')
        } else {
            formatLog('编译成功', 'green')
            n && n.kill('SIGINT')

            n = cp.fork(path.join(__dirname, '../build/index.js'), {
                cwd: path.join(__dirname, '../build')
            })

            n.on('exit', (code, signal) => {
                formatLog(`服务收到信号 ${signal || code} 退出!`, 'cyan')
            })
            n.on('message', (url) => {
                formatLog('服务重新启动成功', 'green')
                console.log(chalk.underline(url))
            })
        }
    })
}