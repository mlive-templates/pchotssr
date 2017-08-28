export function answer(success, msg, data) {
    return {
        success: success,
        msg: msg.toString(),
        data: data
    }
}
/**
 * 返回当前时间，10位，忽略毫秒
 */
export function getCurTime() {
    const date = new Date()
    return (date.valueOf() + '').slice(0, 10) - 0
}

export function formateDate(time, style, diff) {
    // 如果传入的是时间戳，必须是number类型，否则报错
    const d = diff || 0
    const date = new Date(new Date(time).getTime() + d * (1000 * 60 * 60 * 24))
    const weekDay = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    const db = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        mm: ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1),
        d: date.getDate(),
        dd: (date.getDate() < 10 ? '0' : '') + date.getDate(),

        _h: date.getHours(),
        _hh: (date.getHours() < 10 ? '0' : '') + date.getHours(),
        _m: date.getMinutes(),
        _mm: (date.getMinutes() < 10 ? '0' : '') + date.getMinutes(),
        _s: date.getSeconds(),
        _ss: (date.getSeconds() < 10 ? '0' : '') + date.getSeconds(),

        lastDay: null,
        w: weekDay[date.getDay()],
        week: date.getDay(),
        time: date.getTime(),
        string: ''
    }
    let nextMonthDay1
    if (db.m + 1 > 12) {
        nextMonthDay1 = new Date((db.y + 1) + '/01/1')
    } else {
        nextMonthDay1 = new Date(db.y + '/' + (db.m + 1) + '/1')
    }
    // 本月末 = 下月初1-1000毫秒
    db.lastDay = (new Date(nextMonthDay1.getTime() - 1000)).getDate()
    if (style && style.indexOf('yy/mm/dd') > -1) {
        db.string = db.y + '/' + db.mm + '/' + db.dd
    } else if (style && style.indexOf('yymmdd') > -1) {
        db.string = db.y + '' + db.mm + '' + db.dd
    } else if (style && style.indexOf('yy-mm-dd') > -1) {
        db.string = db.y + '-' + db.mm + '-' + db.dd
    } else {
        db.string = db.y + '/' + db.m + '/' + db.d;
    }
    if (style && style.indexOf('hh:mm:ss') > -1) {
        db.string += ' ' + db._hh + ':' + db._mm + ':' + db._ss
    }
    return db
}

export function routerWrap(genFn) {
    return async function (req, res, next) {
        try {
            await genFn(req, res, next)
            if (!res.headersSent) {
                res.status(404).json({
                    success: false,
                    msg: 'empty return',
                    data: ''
                })
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                msg: error.toString(),
                data: ''
            })
        }
    }
}
/**
 *  邮箱配置
 */
const mailConfig = {
    service: 'mtime',
    user: 'mtimelive@mtime.com',
    pass: 'mmm414mmm'
}
const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')
const transporter = nodemailer.createTransport(smtpTransport({
    // service: config.email.service,
    host: 'smtp.mtime.com',
    port: 25,
    secure: false,
    auth: {
        user: mailConfig.user,
        pass: mailConfig.pass
    }
}))

/**
 * 发送邮件方法封装
 * @param {String} recipient 收件人
 * @param {String} subject 发送的主题
 * @param {String} html 发送的html内容
 */
export function sendMail(recipient, subject, type, data) {
    let tpl = ``
    if (type === 1) {
        tpl = `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <meta http-equiv="X-UA-Compatible" content="ie=edge">
                    <title>时光网合作平台</title>
                </head>
                <body style="margin: 0; padding: 0;">
                    <p>您好,</p>
                    <p>感谢您支持时光直播。</p>
                    <br>
                    <br>
                    <p>${data.time}有新的活动:</p>
                    <p style="color:#f89e30">${data.name}</p>
                    <p>欢迎合作分发。</p>
                    <br>
                    <br>
                    <p>详情请登录平台查看。<a href="http://cooperation.mtime.com">cooperation.mtime.com</a></p>
                    <br>
                    <br>
                </body>
                </html>`
    }
    if (type === 2) {
        tpl = `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <meta http-equiv="X-UA-Compatible" content="ie=edge">
                    <title>时光网合作平台</title>
                </head>
                <body style="margin: 0; padding: 0;">
                    <p>您好,</p>
                    <p>感谢您支持时光直播。</p>
                    <br>
                    <br>
                    <p>${data.name} ，推流信息有了新动态:</p>
                    <p style="color:#f89e30">播放地址:${data.streamAddr}</p>
                    <p style="color:#f89e30">预定测试时间:${data.time}</p>
                    <p style="color:#f89e30">当前状态:${data.stateName}</p>
                    <p >详情请登录平台查看。<a href="http://cooperation.mtime.com">cooperation.mtime.com</a></p>
                    <br>
                    <br>
                </body>
                </html>`
    }
    if (type === 3) {
        tpl = `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <meta http-equiv="X-UA-Compatible" content="ie=edge">
                    <title>时光网合作平台</title>
                </head>
                <body style="margin: 0; padding: 0;">
                    <p>您好,</p>
                    <p>感谢您支持时光直播。</p>
                    <br>
                    <br>
                    <p>您参与的 ${data.name}，有了新消息:</p>
                    <p style="color:#f89e30">${data.message}</p>
                    <p>详情请登录平台查看。<a href="http://cooperation.mtime.com">cooperation.mtime.com</a></p>
                    <br>
                    <br>
                </body>
                </html>`
    }
    transporter.sendMail({
        from: mailConfig.user,
        to: recipient,
        subject: subject,
        html: tpl
    }, function (error, response) {
        if (error) {
            logger.error(error)
            return
        }
        logger.info(recipient + ':邮件发送成功')
    })
}