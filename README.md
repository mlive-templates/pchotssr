# 基于webpack 搭建的前端开发项目环境

## 主要特点
- 搭载 webpack热加载（webpack-hot-middleware） 功能
- 开发前端代码热加载自动刷新浏览器，开发后端代码自动监听重新启动服务
- 开发环境打包服务文件，打包服务端ssr bundles.json文件热加载
- 后端加入了路由控制器概念
- 无数据库支持
- 适合 vue ssr 开发

## meta.js介绍
- 安装过程中过滤一些不需要安装的插件等问题
- 使用 插件 inquirer
- 配置结构参考 https://github.com/SBoudrias/Inquirer.js 配置quesitons