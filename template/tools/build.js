process.env.NODE_ENV = 'production'

var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('./config')
var packageInfo = require('./lib/packageInfo.js')

var spinner = ora('开始构建...')
console.time('buildTime')
spinner.start()

rm(path.join(config.build.assetsRoot), err => {
    if (err) throw err
    packageInfo.copy().then(() => {
        console.log('copy package.json complete!')

        var configList = []
        setConfig(require('./webpack.prod.conf'))
        setConfig(require('./webpack.server.conf'))
        setConfig(require('./webpack.index.conf'))

        function setConfig(cfg) {
            if (cfg) {
                configList = configList.concat(cfg)
            }
        }

        if (configList.length > 0) {
            spinner.text = '开始构建所有任务......'
            webpack(configList, function (err, MultiStats) {
                spinner.stop()
                if (err) throw err
                for (var i = 0; i < MultiStats.stats.length; i++) {
                    var Stats = MultiStats.stats[i]
                    if (Stats.compilation.errors.length !== 0) {
                        console.log(Stats.compilation.errors)
                        console.log(chalk.red('构建失败'))
                        return
                    } else {
                        process.stdout.write(Stats.toString({
                            colors: true,
                            modules: false,
                            children: false,
                            chunks: false,
                            chunkModules: false
                        }) + '\n\n')
                    }
                }
                console.log(chalk.cyan('构建完成.\n'))
                console.timeEnd('buildTime')
            })
        } else {
            console.log('没有构建任务!')
        }
    }).catch((err) => {
        console.log(err)
        process.exit(0)
    })
})