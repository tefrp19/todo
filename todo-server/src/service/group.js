const { exec } = require('../db/mysql')
const { Model } = require('../model/model')
const { checkParams } = require('./app')

// 查询所有分组
exports.getGroups = async (req, res) => {
    const { userId } = req.session
    const sql = 'select id,name from `group` where user_id=?;'
    const groups = await exec(sql, userId)
    res.send(new Model(groups))
}

// 添加分组
exports.addGroup = async (req, res, next) => {
    const { userId } = req.session
    const params = req.body
    // 检验前端传的字段是否有效
    if (!checkParams(params, ['name'])) {
        next('paramsError')
        return
    }
    const { name } = params
    const sql = 'insert into `group` values(null,?,?);'
    await exec(sql, [name, userId])
    res.send(new Model())
}

// 修改分组
exports.modifyGroup = async (req, res, next) => {
    const { userId } = req.session
    const { id: groupId } = req.params
    const params = req.body
    // 检验前端传的字段是否有效
    if (!checkParams(params, ['name'])) {
        next('paramsError')
        return
    }
    const { name } = params
    const sql = 'update `group` set name=?  where id=? and user_id=?;'
    await exec(sql, [name, groupId, userId])

    res.send(new Model())
}

// 删除分组
exports.deleteGroup = async (req, res) => {
    const { userId } = req.session
    const { id } = req.params
    const sql = 'delete from `group` where id=? and user_id=?;'
    await exec(sql, [id, userId])
    res.send(new Model())
}

