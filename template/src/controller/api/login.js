/**
 * create time: Login 类
 * fn: 处理Login 相关的 逻辑
 */
const Common = require('../../common/common')
class Login {
    /**
     * 用户登录
     */
    async login(req, res, next) {
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.5) {
                    resolve()
                } else {
                    reject()
                }
            }, 500)
        }).then(() => {
            res.send(Common(true, '登录成功', ''))
        }).catch(() => {
            res.send(Common(false, '登录失败', ''))
        })
    }
    /**
     * 注销登录
     */
    async logout(req, res, next) {
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.5) {
                    resolve()
                } else {
                    reject()
                }
            }, 500)
        }).then(() => {
            res.send(Common(true, '注销成功', ''))
        }).catch(() => {
            res.send(Common(false, '注销失败', ''))
        })
    }
}

module.exports = Login