/**
 * webpack index 启动服务 配置
 */
var path = require('path')
var rootPath = path.join(__dirname, '../')
var nodeExternals = require('webpack-node-externals')

const isProduction = process.env.NODE_ENV === 'production'
const entryPath = isProduction ? path.join(rootPath, './src/bin/www.js') : path.join(__dirname, './dev-server.js')

var config = {
    entry: {
        app: entryPath
    },
    target: 'node',
    context: path.resolve(__dirname, '../build'),
    output: {
        path: path.join(rootPath, 'build'),
        filename: 'index.js'
    },
    resolve: {
        extensions: ['.js']
    },
    externals: [nodeExternals({
        modulesDir: path.join(rootPath, 'node_modules')
    })],
    node: {
        console: true,
        global: true,
        process: true,
        Buffer: true,
        __filename: false,
        __dirname: true,
        setImmediate: true
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader'
        }]
    }
}

module.exports = config