/**
 * webpack server 配置
 */
const path = require('path')
const webpack = require('webpack')
const VueSSRPlugin = require('vue-ssr-webpack-plugin')
const utils = require('./utils')
const entry = require('./lib/entryInfo').getServerEntry()
const config = require('./config')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}
const rootPath = path.resolve(__dirname, '../')

const isProduction = process.env.NODE_ENV === 'production'
const vueLoaderConfig = {
    loaders: utils.cssLoaders({
        sourceMap: isProduction ?
            config.build.productionSourceMap : config.dev.cssSourceMap,
        extract: false
    })
}
// var cssLoader = utils.styleLoaders({
//     sourceMap: config.build.productionSourceMap,
//     extract: true
// })
// console.log(cssLoader)

function getConfig(entry) {
    return {
        entry: path.resolve(__dirname, '../src/views/entry/server', entry + '.js'),
        target: 'node',
        output: {
            libraryTarget: 'commonjs2', // !different
            path: path.join(rootPath, 'build/bundles')
        },
        resolve: {
            alias: {
                'vue$': 'vue/dist/vue.esm.js',
                'components': resolve('/src/client/components'), // 定义文件路径， 加速打包过程中webpack路径查找过程
                '@': rootPath
            },
            extensions: ['.js', '.less', '.vue', '*', '.json']
        },
        externals: Object.keys(require('../package.json').dependencies),
        module: {
            rules: [...utils.styleLoaders({
                sourceMap: config.build.productionSourceMap,
                extract: false
            }), {
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
            new VueSSRPlugin({
                filename: entry + '-vue-ssr-bundle.json'
            }),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                },
                sourceMap: false
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: '"production"'
                }
            })
        ]
    }
}

module.exports = entry.map(name => getConfig(name))