// require('babel-core/register')
const opn = require('opn')
import _app from '../src/index'
const app = _app.app
const router = _app.router

const config = require('./config')
process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)

const webpack = require('webpack')
const proxyMiddleware = require('http-proxy-middleware')
const webpackConfig = require('./webpack.dev.conf')

const port = process.env.PORT || config.dev.port

const autoOpenBrowser = !!config.dev.autoOpenBrowser
const proxyTable = config.dev.proxyTable

const compiler = webpack(webpackConfig)

const devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true
})

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: () => {},
    timeout: 2000,
    heartbeat: 1000
})

Object.keys(proxyTable).forEach(function (context) {
    var options = proxyTable[context]
    if (typeof options === 'string') {
        options = {
            target: options
        }
    }
    app.use(proxyMiddleware(options.filter || context, options))
})

app.use(devMiddleware)
app.use(hotMiddleware)

app.use('/', router)

// var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
// app.use(staticPath, express.static('./static'))

const uri = 'http://localhost:' + port

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
    process.send(uri)
    // when env is testing, don't need open it
    if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
        opn(uri)
    }
})

app.listen(port)