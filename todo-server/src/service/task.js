const { exec } = require('../db/mysql') // 导入封装的执行 sql 的异步函数（promise）
const { Model } = require('../model/model') // 抽象的响应对象

exports.getTasks = (req, res) => {
    console.log('当前用户的userId为：', req.session.userId);

    res.send({ data: 123 })

    // const userId = req.user.userId
    // const groupId = req.body.groupId
    // const sql = 'SELECT id,`name`,note,deadline,`check`,important FROM task WHERE user_id=? and group_id=?'
    // exec(sql, [userId, groupId]).then(results => {
    //     // console.log(results);
    //     res.send(new Model(results))
    // })

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
