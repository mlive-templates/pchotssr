// require('babel-core/register')
import http from 'http'
import _app from '../src/index'
const app = _app.app
const router = _app.router
const config = require('./config')

const proxyMiddleware = require('http-proxy-middleware')

const port = config.dev.port

const proxyTable = config.dev.proxyTable

Object.keys(proxyTable).forEach(function (context) {
    var options = proxyTable[context]
    if (typeof options === 'string') {
        options = {
            target: options
        }
    }
    app.use(proxyMiddleware(options.filter || context, options))
})

function myServer(middlewarelist, cb) {
    middlewarelist.forEach(middleware => {
        app.use(middleware)
    })

    app.use('/', router)

    const server = http.createServer(app)
    const sockets = []

    function onError(err) {
        console.log(err)
    }

    function onListen() {
        cb && typeof cb === 'function' && cb()
    }

    function onConnection(socket) {
        sockets.push(socket);
        socket.once('close', function () {
            sockets.splice(sockets.indexOf(socket), 1)
        })
    }
    server.on('error', onError)
    server.on('listening', onListen)
    server.on('connection', onConnection)
    server.listen(port)
    const r = {
        close: function (done) {
            sockets.forEach(function (socket) {
                socket.destroy()
            })
            server.close((err) => {
                console.log('web服务关闭')
                if (err) {
                    done(err)
                }
                done()
            })
        }
    }
    return r
}
module.exports = myServer