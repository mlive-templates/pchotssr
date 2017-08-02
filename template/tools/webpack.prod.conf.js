/**
 * webpack client prod 配置
 */
var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('./config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var env = config.build.env
var webpackConfig = merge(baseWebpackConfig, {
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.build.productionSourceMap,
            extract: true
        })
    },
    devtool: config.build.productionSourceMap ? '#source-map' : false,
    output: {
        path: config.build.assetsRoot,
        filename: utils.assetsPath('script/[name].js')
        // chunkFilename: utils.assetsPath('script/[id].js')
    },
    plugins: [
        // http://vuejs.github.io/vue-loader/en/workflow/production.html
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

        // extract webpack runtime and module manifest to its own file in order to
        // prevent vendor hash from being updated whenever app bundle is updated
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'manifest',
        //     chunks: ['vendor']
        // }),
    ]
})

// if (config.build.productionGzip) {
//     var CompressionWebpackPlugin = require('compression-webpack-plugin')

//     webpackConfig.plugins.push(
//         new CompressionWebpackPlugin({
//             asset: '[path].gz[query]',
//             algorithm: 'gzip',
//             test: new RegExp(
//                 '\\.(' +
//                 config.build.productionGzipExtensions.join('|') +
//                 ')$'
//             ),
//             threshold: 10240,
//             minRatio: 0.8
//         })
//     )
// }

// if (config.build.bundleAnalyzerReport) {
//     var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
//     webpackConfig.plugins.push(new BundleAnalyzerPlugin())
// }

module.exports = (ops) => {
    return merge(webpackConfig, ops)
}