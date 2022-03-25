const express = require('express')
// 创建路由对象
const router = express.Router()
const service = require('../service/service')
// 思路：前面中间件将业务处理完交给后面的中间件（next()），若中间出错了（提交数据不合要求或系统错误等）：
// 1.直接发送响应告知错误，结束该中间件服务（return）
// 2.错误情况较多时最后写一个错误中间件，由错误中间件兜底（处理所有可能的错误）发送相应的错误信息
const {checkRegister,checkLogin}=require('../service/user')
router.post('/register',[checkRegister,service.register])
router.post('/login',[checkLogin,service.login])
router.post('/getTasks', service.getTasks)
router.post('/addTask', service.addTask)
router.post('/modifyTask', service.modifyTask)
router.post('/deleteTask', service.deleteTask)


router.get('/crosTest', (req, res)=>{
    console.log(req);
    res.send({
        data:123
    })
})

// router.get('/sessionTest',service.sessionTest)

module.exports = router

