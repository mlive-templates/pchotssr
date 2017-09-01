import render from '../../render'

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

export default {
    view,
    loginView
}