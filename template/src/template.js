import config from './config'
import path from 'path'
import fs from 'fs-extra'
const cacheAssetsJson = fs.readJsonSync(path.join(__dirname, './bundles/client-assets.json'))

const isDevelopmen = process.env.NODE_ENV === 'development'

function render(name) {
    const staticServer = config.staticServer
    const cdn = config.cdn
    const env = config.name
    const startup = config.startup
    const assetsJson = cacheAssetsJson
    let publicPath = '/' + cdn
    if (!isDevelopmen) {
        publicPath = staticServer + publicPath
    }
    const css = assetsJson[name].css.map(function (item) {
        return `<link rel="stylesheet" href="${publicPath}/${item}" />`
    }).join('')
    const scripts = assetsJson[name].js.map(function (item) {
        return `<script type="text/javascript" src="${publicPath}/${item}"></script>`
    }).join('')
    const html = `
    <!doctype html>
    <html>
    <head>
        <meta charset="utf-8" />
        <meta content="IE=edge,chrome=1" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="renderer" content="webkit" />
        <meta name="360-fullscreen" content="true" />
        <meta name="x5-fullscreen" content="true" />
        <meta name="full-screen" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="http-equiv=X-UA-COMPATIBLE" content="IE=edge,chrome=1" />
        <meta name="startup" content="${startup}" />
        <meta content="${cdn}" name="cdn">
        <meta content="${env}" name="env">
        <link type="image/x-icon" href="//static1.mtime.cn/favicon.ico" rel="shortcut icon" />
        <link type="image/x-icon" href="//static1.mtime.cn/favicon.ico" rel="bookmark" />
        <link rel="apple-touch-icon" href="//static1.mtime.cn/favicon.ico" />
        ${css}
        <title>错误信息收集平台</title>
    </head>
    <body>
        <div id="app">
            <!--vue-ssr-outlet-->
        </div>
        {{{ renderState() }}}
        {{{ renderScripts() }}}
        ${scripts}
    </body>
    </html>
    `
    return html
}

function renderError() {
    return render('404')
}

export default {
    render,
    renderError
}