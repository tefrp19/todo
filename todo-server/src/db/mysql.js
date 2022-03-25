
const { mysqlConn } = require('../conf/db')
/**
 * exec 封装执行 sql 的 promise
 * @param {string} sql - sql 语句
 * @param {Array} param - sql 语句的参数，为了防止 sql 注入需要进行转义
 */
module.exports.exec = (sql, param) => {
    return new Promise((reslove, reject) => {
        mysqlConn.query(sql, param, (err, results) => {
            if (err) {
                console.log('数据库相关问题：', err);
                if (err.code === 'ECONNREFUSED') {
                    console.log('数据库连接失败');
                    reject(err)
                }
                if (err.code === 'ER_PARSE_ERROR') {
                    console.log('sql 语法错误');
                    reject(err)
                }
            }
            reslove(results)
        })
    })

}
module.exports.escape = require('mysql').escape