var path = require('path')
var fs = require('fs')

const baseConfig = {

    default: {
        name: 'default',
        logs: './logs',
        port: '8092',
        staticServer: '//static1.mtime.cn',
        db: 'mongodb://root:root@192.168.217.144/statistic-error'
    },
    dev: {
        name: 'dev',
        staticServer: '',
        db: 'mongodb://root:root@192.168.217.144/statistic-error'
    },
    qa: {
        name: 'qa',
        staticServer: '',
        db: 'mongodb://root:root@192.168.217.144/statistic-error'
    },
    pre: {
        name: 'pre',
        db: 'mongodb://root:root@192.168.217.144/statistic-error'
    },
    prod: {
        name: 'prod',
        db: 'mongodb://root:root@192.168.217.144/statistic-error'
    }
}

function init() {
    /*eslint-disable*/
    var env = typeof process.env.NODE_ENV === 'undefined' ? 'dev' : process.env.NODE_ENV
    let config
    switch (env) {
        case 'prod':
            config = baseConfig.prod
            break
        case 'pre':
            config = baseConfig.pre
            break
        case 'qa':
            config = baseConfig.qa
            break
        default:
            config = baseConfig.dev
    }
    // console.info('Config.init.success', config.name)

    const dir = path.resolve(__dirname, './package.json')
    try {
        const pkgStr = fs.readFileSync(dir, 'utf8')
        const pkg = JSON.parse(pkgStr)
        config.cdn = pkg.cdn
    } catch (error) {
        env !== 'development' && console.info('can not read package.json')
    }
    return {
        name: get('name', config),
        logs: get('logs', config),
        port: get('port', config),
        staticServer: get('staticServer', config),
        db: get('db', config),
        cdn: get('cdn', config),
        startup: new Date()
    }
}

function getConfig(key, store) {
    const info = key.split('.')
    let cur = null
    info.map((item) => {
        if (typeof store[item] !== 'undefined') {
            store = store[item]
            cur = store
        } else {
            cur = null
        }
    })
    return cur
}

function get(key, config) {
    let value = getConfig(key, config)
    if (value === null) {
        value = getConfig(key, baseConfig.default)
        if (value === null && process.env.NODE_ENV !== 'development') {
            console.warn('defaultConfig is undefined', key)
        }
    }
    return value
}

export default init()