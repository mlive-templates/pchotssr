import fs from 'fs-extra'
import * as vueServerRender from 'vue-server-renderer'
import LRU from 'lru-cache'
import path from 'path'
import templateFactory from './template'
const cacheBundle = {}

const bundleJsonPath = path.join(__dirname, './bundles')
let bundleFiles
try {
    bundleFiles = fs.readdirSync(bundleJsonPath)
} catch (error) {
    console.log('没有bundleJson文件')
    bundleFiles = []
}

bundleFiles.forEach((val, index) => {
    if (val.indexOf('.json') > -1) {
        const matchs = val.match(/(\w+)-vue-ssr-bundle\.json/)
        if (!matchs) {
            return
        }
        const key = matchs[1]
        const json = path.resolve(bundleJsonPath, `./${key}-vue-ssr-bundle.json`)
        const bundleRender = vueServerRender.createBundleRenderer(
            json, {
                inject: false,
                cache: LRU({
                    max: 10000,
                    maxAge: 1000 * 60 * 15 // 缓存时间 15分钟
                }),
                template: templateFactory.render(key)
            })
        cacheBundle[key] = bundleRender
        bundleRender.renderToString({
            _$forCache: true
        }, (err, html) => {
            err && console.error(err)
        })
    }
})

function render(name, data) {
    data = data || {}
    // 计算渲染时间
    const oldTime = +(new Date())
    let bundleRender
    if (process.env.NODE_ENV !== 'development' && cacheBundle[name]) {
        bundleRender = cacheBundle[name]
    } else {
        const json = path.resolve(bundleJsonPath, `./${name}-vue-ssr-bundle.json`)
        bundleRender = vueServerRender.createBundleRenderer(
            json, {
                inject: false,
                cache: LRU({
                    max: 10000,
                    maxAge: 1000 * 60 * 15 // 缓存时间 15分钟
                }),
                template: templateFactory.render(name)
            })
        cacheBundle[name] = bundleRender
    }
    return new Promise((resolve, reject) => {
        bundleRender.renderToString(data, (err, html) => {
            if (err) {
                reject(err)
            } else {
                const newTime = +(new Date())
                const cost = (newTime - oldTime)
                console.info('渲染完成' + name + '...消耗时长为:' + cost + 'ms')
                resolve(html)
            }
        })
    })
}

export default {
    render
}