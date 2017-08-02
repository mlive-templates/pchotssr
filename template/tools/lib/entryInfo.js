/**
 * 获取 webpack entry 文件配置
 */
const path = require('path')
const fs = require('fs-extra')
const rootPath = path.join(__dirname, '../../')

function getClientEntry(_p = './src/views/entry/client') {
    const readPath = path.resolve(rootPath, _p)
    if (!fs.existsSync(readPath)) {
        console.log('客户端入口目录不存在')
        return {}
    }
    const files = fs.readdirSync(readPath)
    const entry = {}
    files.forEach((val, index) => {
        if (val.indexOf('.js') > -1) {
            const name = val.substr(val.lastIndexOf('/') + 1, val.indexOf('.js'))
            entry[name] = ['babel-polyfill', readPath + '/' + val]
        }
    })
    return entry
}

function getServerEntry(_p = './src/views/entry/server') {
    const readPath = path.resolve(rootPath, _p)
    if (!fs.existsSync(readPath)) {
        console.log('服务端入口目录不存在')
        return {}
    }
    const files = fs.readdirSync(readPath)
    const entry = []
    files.map((val, index) => {
        if (val.indexOf('.js') > -1) {
            const name = val.substr(val.lastIndexOf('/') + 1, val.indexOf('.js'))
            entry.push(name)
        }
    })
    return entry
}

module.exports = {
    getClientEntry,
    getServerEntry
}