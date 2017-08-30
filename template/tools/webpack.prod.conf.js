/**
 * webpack client prod 配置
 */
var utils = require('./utils')
var webpack = require('webpack')
var config = require('./config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var env = config.build.env

function getConfig() {
    if (utils.isEmpty(baseWebpackConfig.entry)) {
        return false
    }
    var cdn = require('./lib/packageInfo.js').getInfo().cdn
    return merge(baseWebpackConfig, {
        output: {
            path: config.build.assetsRoot + '/client/' + cdn,
            publicPath: '/' + cdn + '/',
            filename: utils.assetsPath('script/[name].js')
        },
        module: {
            rules: utils.styleLoaders({
                sourceMap: config.build.productionSourceMap,
                extract: true
            })
        },
        devtool: config.build.productionSourceMap ? '#source-map' : false,
        plugins: [
            new webpack.DefinePlugin({
                'process.env': env
            }),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                },
                sourceMap: true
            }),
            // extract css into its own file
            new ExtractTextPlugin({
                filename: utils.assetsPath('css/[name].css')
            })
        ]
    })
}

module.exports = getConfig()