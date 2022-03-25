// 1. 导入mysql模块
const mysql = require('mysql')
// 2. 创建与MySQL数据库的连接关系
// 使用连接池连接数据库能降低反复连接数据库带来的开销
const mysqlConn = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'todo'//指定操作的数据库
})


module.exports = {mysqlConn}
