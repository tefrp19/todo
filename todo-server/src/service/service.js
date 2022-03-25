const { exec } = require('../db/mysql') // 导入封装的执行 sql 的异步函数（promise）
const escape = require('mysql').escape;// 防止 sql 注入
const { Model } = require('../model/model') // 抽象的响应对象

exports.register = async (req, res) => {
    try {
        const { username, password } = req.body

        const crypto = require('../utils/crypto')
        // 生成一个随机密码盐
        const randomNum = Math.floor(Math.random() * 1000)
        const salt = crypto('' + randomNum)
        const cryptedPassword = crypto(password + salt)
        const sql = 'INSERT INTO user VALUES(null,?,?,?)'
        // 从 exec 返回的结果中提取 insertId 的值，并将其重命名为 userId
        const { insertId: userId } = await exec(sql, [username, cryptedPassword, salt])

        // 注册成功后为该用户添加一个默认分组
        const addGroupSql = 'INSERT INTO `group` VALUES(NULL,\'默认分组\',?);'
        await exec(addGroupSql, userId)

        res.send(new Model({ userId }))
    } catch (error) {
        res.send(new Model('500', '注册失败'))
    }


}


exports.login = async (req, res) => {
    const userId = req.userId
    // 生成 token 
    const jwt = require('jsonwebtoken')
    // 密钥要和解析 token 时的密钥一致
    const secreKey = '123456'
    const token = jwt.sign({ userId: userId }, secreKey, { expiresIn: '60000s' })
    // 登录成功后还要返回用户对应的所有分组信息（分组id、分组名字）
    const sql = 'SELECT id,name FROM `group` WHERE user_id=?;'
    const result = await exec(sql, userId)
    const data = {
        token,
        groups: result,
    }
    res.send(new Model(data))

}

exports.getTasks = (req, res) => {
    const userId = req.user.userId
    const groupId = req.body.groupId
    const sql = 'SELECT id,`name`,note,deadline,`check`,important FROM task WHERE user_id=? and group_id=?'
    exec(sql, [userId, groupId]).then(results => {
        // console.log(results);
        res.send(new Model(results))
    })
}

exports.addTask = (req, res) => {
    const userId = req.user.userId
    const { groupId, name } = req.body
    // user_id、group_id
    const sql = 'INSERT INTO task VALUES(NULL,?,?,?,NULL,NULL,0,0)'
    exec(sql, [userId, groupId, name]).then(result => {
        const data = {
            taskId: result.insertId
        }
        res.send(new Model(data))
    })
}

exports.modifyTask = async (req, res) => {
    const userId = req.user.userId
    const { taskId, groupId, name, note, deadline, check, important } = req.body
    const sql = 'UPDATE task SET group_id=?,name=?,note=?,deadline=?,`check`=?,important=?  WHERE id = ? AND user_id=?'
    try {
        await exec(sql, [groupId, name, note, deadline, check, important, taskId, userId])
        res.send(new Model())
    } catch (error) {
        res.send(new Model(400, '请求错误'))
    }

}

exports.deleteTask = (req, res) => {
    const userId = req.user.userId
    const taskId = req.body.taskId
    const sql = 'DELETE FROM task WHERE user_id=? and id=?'

    exec(sql, [userId, taskId]).then(results => {
        res.send(new Model())
    })

}


// exports.sessionTest = (req, res) => {
//     const { userName } = req.query
//     // console.log(req);
//     if (req.session.views) {
//         req.session.views++
//         res.setHeader('Content-Type', 'text/html')
//         res.write('<p>views: ' + req.session.views + '</p>')
//         res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
//         res.write('<p>userName: ' + userName + '</p>')
//         res.end()
//     } else {
//         req.session.views = 1 // 如果是第一次访问则 session 中没有 views 值
//         res.end('welcome to the session demo. refresh!' + userName) // 根据不同的参数展示不同的userName
//     }
// }