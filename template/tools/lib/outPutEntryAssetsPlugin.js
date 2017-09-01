'use strict'
// 是用来解决后台路由render html页面时，html页面 到底应该添加哪些 css,js 文件的问题
// 以前是硬编码。通过这个插件可以在client 打包时，记录下每个entry 对应的css 和js 文件。
// 前后端 通过entry 的name 进行关联
// 将来可能有异步js css 的可能，这个还没有处理
const isJS = function (file) {
    return /\.js(\?[^.]+)?$/.test(file)
}
const isCss = function (file) {
    return /\.css(\?[^.]+)?$/.test(file)
}
const outPutEntryAssetsPlugin = function outPutEntryAssetsPlugin(options) {
    if (options === void 0) options = {}

    this.options = Object.assign({
        filename: 'client-assets.json'
    }, options)
}

outPutEntryAssetsPlugin.prototype.apply = function apply(compiler) {
    const self = this
    compiler.plugin('emit', function (compilation, cb) {
        var stats = compilation.getStats().toJson()
        var manifest = {
            publicPath: stats.publicPath
        }
        Object.keys(stats.entrypoints).forEach(function (item) {
            manifest[item] = {
                js: stats.entrypoints[item].assets.filter(isJS),
                css: stats.entrypoints[item].assets.filter(isCss)
            }
        })
        var json = JSON.stringify(manifest, null, 4)
        if (process.env.NODE_ENV === 'development') {
            writeJsontoDisk(self.options.filename, manifest)
        }
        compilation.assets[self.options.filename] = {
            source: function () {
                return json
            },
            size: function () {
                return json.length
            }
        }
        cb()
    })
}

/**
 * 开发环境做一些事
 */
function writeJsontoDisk(name, json) {
    const fs = require('fs-extra')
    const path = require('path')
    const dir = path.join(__dirname, '../../build/bundles')
    const dest = path.join(dir, path.basename(name))
    if (!fs.existsSync(dir)) {
        fs.mkdirsSync(dir)
    }
    fs.writeJsonSync(dest, json)
}

module.exports = outPutEntryAssetsPlugin