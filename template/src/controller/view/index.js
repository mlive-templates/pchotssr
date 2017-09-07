import render from '../../render'
import path from 'path'

function view(viewName) {
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

async function loginView(req, res, next) {
    const html = await render.render('index')
    res.send(html)
    res.end()
}

function simpleView(viewName) {
    return async(req, res, next) => {
        try {
            res.sendFile(path.resolve(__dirname, './statics/' + viewName + '.html'), function (err) {
                if (err) {
                    next(err)
                }
            })
        } catch (error) {
            next(error)
        }
    }
}

export default {
    view,
    simpleView,
    loginView
}