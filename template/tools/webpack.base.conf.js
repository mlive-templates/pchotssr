/**
 * webpack client 基本配置
 */
var path = require('path')
var utils = require('./utils')
var config = require('./config')
var webpack = require('webpack')
var entryInfo = require('./lib/entryInfo')
var OutPutEntryAssetsPlugin = require('./lib/outPutEntryAssetsPlugin')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}
const rootPath = path.join(__dirname, '../')
const isProduction = process.env.NODE_ENV === 'production'

const vueLoaderConfig = {
    loaders: utils.cssLoaders({
        sourceMap: isProduction ?
            config.build.productionSourceMap : config.dev.cssSourceMap,
        extract: isProduction
    })
}

module.exports = {
    entry: entryInfo.getClientEntry(),
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            'components': resolve('/src/client/components'),
            '@': rootPath
        }
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            options: vueLoaderConfig
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            include: [resolve('src')],
            exclude: /node_modules/
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 10000,
                name: utils.assetsPath('images/[name].[ext]')
            }
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 10000,
                name: utils.assetsPath('fonts/[name].[ext]')
            }
        }]
    },
    plugins: [
        // split vendor js into its own file
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module, count) {
                // any required modules inside node_modules are extracted to vendor
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(
                        path.join(__dirname, '../node_modules')
                    ) === 0
                )
            }
        }),
        new OutPutEntryAssetsPlugin({
            filename: '../../../bundles/client-assets.json'
        })
    ]
}