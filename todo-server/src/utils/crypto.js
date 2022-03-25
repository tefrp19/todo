const crypto = require('crypto')
/**
 * 
 * @param {string} str 
 * @returns {string} 长度为32的加密值
 */
module.exports = str => {
    const md5 = crypto.createHash('md5')
    return md5.update(str).digest('hex')
}
