export default {
    getQueryString: function (name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
        var r = window.location.search.substr(1).match(reg)
        if (r != null) {
            var tmp = unescape(r[2])
            if (tmp.indexOf('?') > -1) {
                return tmp.substr(0, tmp.indexOf('?'))
            } else if (tmp.indexOf('&') > -1) {
                return tmp.substr(0, tmp.indexOf('&'))
            }
            return tmp
        }
        return null
    },
    formateDate: function (time, style, diff) {
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
    },
    flashChecker: function () {
        var hasFlash = 0 // 是否安装了flash
        var flashVersion = 0 // flash版本
        if (navigator.userAgent.indexOf('MSIE') > 0) {
            try {
                const swf = new window.ActiveXObject('ShockwaveFlash.ShockwaveFlash')
                if (swf) {
                    hasFlash = 1
                    var VSwf = swf.GetVariable('$version')
                    flashVersion = parseInt(VSwf.split(' ')[1].split(',')[0])
                }
            } catch (e) {
                hasFlash = 0
            }
        } else {
            if (navigator.plugins && navigator.plugins.length > 0) {
                const swf = navigator.plugins['Shockwave Flash']
                if (swf) {
                    hasFlash = 1
                    var words = swf.description.split(' ')
                    for (var i = 0; i < words.length; ++i) {
                        if (isNaN(parseInt(words[i]))) continue
                        flashVersion = parseInt(words[i])
                    }
                }
            }
        }
        return {
            f: hasFlash,
            v: flashVersion
        }
    },
    getCookie: function (key) {
        var reg = new RegExp('(^| )' + key + '=([^;]*)(;|$)')
        var arr = document.cookie.match(reg)
        if (arr) {
            return unescape(arr[2])
        } else {
            return ''
        }
    },
    setCookie(cname, cvalue, exdays) {
        var d = new Date()
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
        var expires = 'expires=' + d.toUTCString()
        document.cookie = cname + '=' + cvalue + '; ' + expires
    },
    clearCookie: function () {
        this.setCookie('email', '', -1)
        this.setCookie('hash', '', -1)
        this.setCookie('role', '', -1)
        this.setCookie('userId', '', -1)
    }
}