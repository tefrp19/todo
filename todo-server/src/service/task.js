const { exec } = require('../db/mysql') // 导入封装的执行 sql 的异步函数（promise）
const { Model } = require('../model/model') // 抽象的响应对象
const utcToDateStr = require('../utils/utcToDateStr')

/**
 *  转换时间格式
 * @param {Array} tasks 待转换日期的tasks数组
 */
const transTasksDate = (tasks = []) => {
    tasks.forEach(task => {
        if (task.deadline) {
            // 将2022-04-07T16:00:00.000Z转成2021/4/8再转成2021-4-8
            task.deadline = utcToDateStr(task.deadline)
        }
    })
}

exports.getTasks = async (req, res) => {
    const { userId } = req.session
    const { id: groupId } = req.params
    const sql = 'select id,name,note,deadline,`check`,important,today from task where group_id=? and user_id=?;'
    const tasks = await exec(sql, [groupId, userId])
    transTasksDate(tasks)
    res.send(new Model(tasks))
}

exports.addTask = async (req, res) => {
    const { userId } = req.session
    const groupId = parseInt(req.params.id)
    console.log(groupId);
    const { name } = req.body
    const sql = 'INSERT INTO task VALUES(NULL,?,?,?,NULL,NULL,0,0,0)'
    const { insertId: newTaskId } = await exec(sql, [userId, groupId, name])
    const data = { newTaskId }
    res.send(new Model(data))
}

exports.modifyTask = async (req, res) => {
    // 实现效果：前端传什么字段后端改什么字段
    // 1.查所有字段的值
    const { userId } = req.session
    const { taskId } = req.params
    const getTaskInforSql = 'select name,note,deadline,`check`,important,today from task where id=? and user_id=?'
    // 解构赋值
    const [taskInfor] = await exec(getTaskInforSql, [taskId, userId])

    // 2.将前端传来的值覆盖为字段新值（合并两个对象）
    const newTaskInofr = req.body
    Object.assign(taskInfor, newTaskInofr)
    const { name, note, deadline, check, important, today } = taskInfor
    const modifyTaskSql = 'UPDATE task SET name=?,note=?,deadline=?,`check`=?,important=?,today=?  WHERE id = ? AND user_id=?'
    await exec(modifyTaskSql, [name, note, deadline, check, important, today, taskId, userId])
    res.send(new Model())


}

exports.deleteTask = async (req, res) => {
    const { userId } = req.session
    const { groupId, taskId } = req.params // 其中groupId没用
    const sql = 'DELETE FROM task WHERE user_id=? and id=?'

    await exec(sql, [userId, taskId])
    res.send(new Model())
}

exports.getImportantTasks = async (req, res) => {
    const { userId } = req.session
    const sql = 'select id,group_id,name,note,deadline,`check`,today from task where user_id=?'
    const importantTasks = await exec(sql, userId)
    transTasksDate(importantTasks)
    res.send(new Model(importantTasks))
}

exports.getTodayTasks = async (req, res) => {
    const { userId } = req.session
    const sql = 'select id,group_id,name,note,deadline,`check`,important from task where user_id=?'
    const todayTasks = await exec(sql, userId)
    transTasksDate(todayTasks)
    res.send(new Model(todayTasks))
}
