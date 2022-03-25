const { Model } = require('../model/model')
const { exec } = require('../db/mysql')
// 校验注册
exports.checkRegister = (req, res, next) => {
    const { username, password } = req.body
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
    exec(sql, username).then(result => {
        const userNum = result[0]['COUNT(*)']
        if (userNum === 1) {
            res.send(new Model(403, '用户名重复，请重试！'))
        } else {
            // 4. 都没有问题则进行注册
            next()
        }

    })
}

// 校验登录 
exports.checkLogin = (req, res, next) => {
    let { username, password } = req.body

    // 定义一个映射错误的map
    const errInfor = new Map([
        ['usernameNotExist', new Model(403, '用户名不存在，请重试！')],
        ['passwordWrong', new Model(403, '用户名或密码不对，请重试！')],
    ])

    // 1. 检查用户名是否存在
    const checkUsername = () => {
        return new Promise((reslove, reject) => {
            const sql1 = 'SELECT COUNT(*) FROM user WHERE user_name=?;'
            exec(sql1, username).then(result => {
                const userNum = result[0]['COUNT(*)']
                if (userNum === 0) {
                    // promise失败
                    reject('usernameNotExist')
                }
                reslove()
            })
        })
    }

    // 2. 检查密码是否正确
    const checkPassword = () => {
        return new Promise((reslove, reject) => {
            // 首先查出 salt
            const sql2 = 'SELECT salt FROM user WHERE user_name=?;'
            exec(sql2, username).then(res => {
                const salt = res[0].salt
                // 根据密码和 salt 检查密码是否正确
                const crypto = require('../utils/crypto')
                const cryptedPassword = crypto(password + salt)
                const sql3 = 'SELECT id FROM user WHERE user_name=? AND password=?'
                exec(sql3, [username, cryptedPassword]).then(reslut => {
                    // 密码正确找到对应用户 id
                    if (reslut.length === 1) {
                        req.userId = reslut[0].id
                        reslove()
                    } else {
                        reject('passwordWrong')
                    }
                })
            })
        })
    }

    checkUsername().then(_ => {
        // 检查用户名存在后再校验密码
        return checkPassword()
    }).then(_ => {
        // 校验成功，进行下一个中间件
        next()
    }).catch(err => {
        // console.log(err);
        // 同一错误处理
        const response = errInfor.get(err)
        res.send(response)
    })

}