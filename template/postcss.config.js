/**
 * 这个文件必须存在, 而且必须安装postcss-smart-import这个包
 * 这样在webpack中不用再配置postcss就可以实现css加前缀功能
 */
module.exports = {
    plugins: [
        require('postcss-smart-import')({ /* ...options */ }),
        require('autoprefixer')({ /* ...options */ }),
        // vue-loader 插件调用postcss 的时候不会提出错误，这个插件用来解决这股问题
        require('postcss-reporter')
    ]
}