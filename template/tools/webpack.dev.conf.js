/**
 * webpack client dev 配置
 */
var utils = require('./utils')
var webpack = require('webpack')
var config = require('./config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

Object.keys(baseWebpackConfig.entry).forEach(function (name) {
    baseWebpackConfig.entry[name] = ['webpack-hot-middleware/client?noInfo=true&reload=true'].concat(baseWebpackConfig.entry[name])
})

function getConfig() {
    return !utils.isEmpty(baseWebpackConfig.entry) && merge(baseWebpackConfig, {
        module: {
            rules: utils.styleLoaders({
                sourceMap: config.dev.cssSourceMap
            })
        },
        // cheap-module-eval-source-map is faster for development
        devtool: '#cheap-module-eval-source-map',
        plugins: [
            new webpack.DefinePlugin({
                'process.env': config.dev.env
            }),
            // 热加载
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin(),

            new FriendlyErrorsPlugin()
        ]
    })
}

module.exports = getConfig()