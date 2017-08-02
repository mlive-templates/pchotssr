// const template = require('../../template')
const render = require('../../render')
exports.default = function (viewName) {
    return async(req, res, next) => {
        // context 携带数据渲染模板
        const html = await render.render(viewName, {
            userInfo: {
                name: 'mtime',
                email: 'xxxxxxxxx.@mtime.com'
            }
        })
        res.send(html)
        res.end()
    }
}

exports.loginView = async function (req, res, next) {
    const html = await render.render('index')
    res.send(html)
    res.end()
}