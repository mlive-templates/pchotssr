// 静态网站构建配置文件 - 仅适用于简单的html项目
var path = require('path')
var rootPath = path.join(__dirname, '../')
var entryInfo = require('./lib/entryInfo')
var packageInfo = require('./lib/packageInfo.js')
var cdn = packageInfo.getInfo().cdn

var config = {
    entry: entryInfo.getStaticEntry(),
    output: {
        path: path.join(rootPath, 'build', 'client', cdn),
        publicPath: process.env.NODE_ENV === 'development' ? '/' + cdn + '/' : '//static1.mtime.cn/' + cdn + '/',
        filename: '../../../__static_package_temp__.js'
    },
    module: {
        rules: [{
            test: /\.(html|htm)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    outputPath: '../../../',
                    name: 'statics/[name].[ext]'
                }
            }, {
                loader: 'extract-loader'
            }, {
                loader: 'html-loader',
                options: {
                    attrs: ['img:src', 'link:href', 'script:src'],
                    interpolate: true
                }
            }]
        }, {
            test: /\.css$/,
            loaders: [{
                loader: 'file-loader',
                options: {
                    name: 'css/[name].[ext]'
                }
            }, {
                loader: 'extract-loader'
            }, {
                loader: 'css-loader'
            }]
        }, {
            test: /\.js$/,
            loaders: [{
                loader: 'file-loader',
                options: {
                    name: 'script/[name].[ext]'
                }
            }]
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loaders: [{
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'images/[name].[ext]'
                }
            }]
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loaders: [{
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'css/[name].[ext]'
                }
            }]
        }]
    }
}

function getConfig() {
    if (entryInfo.getStaticEntry().length === 0) {
        return false
    } else {
        return config
    }
}
module.exports = getConfig()