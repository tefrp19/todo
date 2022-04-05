// 1. 导入mysql模块
const mysql = require('mysql')
// 2. 创建与MySQL数据库的连接关系
// 使用连接池连接数据库能降低反复连接数据库带来的开销
const mysqlConn = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'todo'//指定操作的数据库
})

// redis配置
const { createClient } = require("redis")
const redisClient = createClient({
    legacyMode: true,
    // 远程服务器redis的url
    url: 'redis://:123456@121.41.94.106:6379'
})

module.exports = { mysqlConn, redisClient }
