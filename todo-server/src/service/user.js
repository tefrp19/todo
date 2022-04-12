const { Model } = require('../model/model')
const { exec } = require('../db/mysql')
const { checkParams } = require('./app')
// 校验注册
exports.checkRegister = async (req, res, next) => {
    const params=req.body
    // 检验前端传的字段是否有效
    if (!checkParams(params,['username','password'])) {
        console.log('传入参数有误');
        next('paramsError')
        return
    }
    const { username, password } =params
   
    // console.log(username, password);
    // 1. 检查用户名是否符合规则：只能由字母、数字和下划线组成，且必须由字母或数字开头，长度最少1位最多10位
    // const usernameReg=/^[a-z|A-Z]([a-z|A-Z|_|0-9]){0,9}$/
    const usernameReg = /^[a-zA-Z0-9]\w{0,9}$/
    if (!usernameReg.test(username)) {
        // 403：服务器理解请求客户端的请求，但是拒绝执行此请求
        res.send(new Model(403, '用户名不符合规范'))
        // 结束该中间件（中间件不继续向后传递，结束本次请求）
    }

    // 2. 检查密码是否符合规则：不能包含空格，长度为8-16位字符（密码过长服务器一直计算），只能包含如下特殊字符：-_.
    const passwordReg = /^[\w\-_.]{8,20}$/
    if (!passwordReg.test(password)) {
        res.send(new Model(403, '密码不符合规范'))
    }

    // 3. 检查用户名是否已存在
    const sql = 'SELECT COUNT(*) FROM user WHERE user_name=?;'
    const result = (await exec(sql, username))
    const userNum = result[0]['COUNT(*)']

    if (userNum === 1) {
        res.send(new Model(403, '用户名重复，请重试！'))
    } else {
        // 4. 都没有问题则进行注册
        next()
    }

}

// 注册
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
// 校验登录 
exports.checkLogin = async (req, res, next) => {
    const params=req.body
    // 检验前端传的字段是否有效
    if (!checkParams(params,['username','password'])) {
        next('paramsError')
        return
    }
    
    let { username, password } = params

    // 1. 检查用户名是否存在
    const checkUsernameSql = 'SELECT COUNT(*) FROM user WHERE user_name=?;'
    const userNum = (await exec(checkUsernameSql, username))[0]['COUNT(*)']
    if (userNum === 0) {
        res.send(new Model(403, '用户名不存在，请重试！'))
        return
    }

    // 2. 检查密码是否正确
    // 2.1查出salt
    const getSaltSql = 'SELECT salt FROM user WHERE user_name=?;'
    const salt = (await exec(getSaltSql, username))[0].salt
    // 2.2根据密码和 salt 检查密码是否正确
    const crypto = require('../utils/crypto')
    const cryptedPassword = crypto(password + salt)
    const checkPasswordSql = 'SELECT id FROM user WHERE user_name=? AND password=?'
    const checkPasswordResult = await exec(checkPasswordSql, [username, cryptedPassword])
    if (checkPasswordResult.length === 1) { // 登录校验成功，执行下一个中间件
        next()
        return
    }
    else {
        res.send(new Model(403, '用户名或密码不对，请重试！'))
    }

}
// 登录
exports.login = async (req, res) => {
    const { username } = req.body
    // 通过username查询userId，并将userId存到session方便后续的sql操作
    const getUserIdsql = 'select id from `user` where user_name=?'
    // 解构赋值
    const [{ id }] = (await exec(getUserIdsql, username))
    req.session.userId = id
    res.send(new Model())
}

// 检查session是否过期，即检查session中是否有userId，没有则代表对应cookie不存在或已超过时间
exports.checkSession = (req, res, next) => {
    if (!req.session.userId) {
        res.send(new Model(400,'session无效，请登录'))
    } else {
        next()
    }
}

// 登出
exports.logout = async (req, res) => {
    delete req.session // 当session被删除时，redis中对应的数据项删除
    res.send(new Model())
}