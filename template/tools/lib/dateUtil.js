/**
 * type可取如下值, 和JAVA里面的formatDate一致
 * yyyy-MM-dd HH:mm:ss
 * yyyy-MM-dd
 * yyyyMMddHHmmss
 */
function formatDate(type) {
    const date = new Date()
    const year = date.getFullYear()
    const month = addZero(date.getMonth() + 1)
    const day = addZero(date.getDate())
    const hour = addZero(date.getHours())
    const min = addZero(date.getMinutes())
    const sec = addZero(date.getSeconds())
    let formatStr = ''
    switch (type) {
        case 'yyyy-MM-dd HH:mm:ss':
            formatStr = year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec
            break
        case 'yyyy-MM-dd':
            formatStr = year + '-' + month + '-' + day
            break
        case 'yyyyMMddHHmmss':
            formatStr = year + month + day + hour + min + sec
            break
        default:
            throw new Error('Not Support Format Type')
    }
    return formatStr
}

// 把不足2位的日期前加0
function addZero(val) {
    if (typeof val === 'number') {
        return val < 10 ? '0' + val : val
    } else {
        throw new Error('arguments is not number')
    }
}
module.exports = {
    formatDate
}