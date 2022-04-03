const express = require('express')
// 创建路由对象
const router = express.Router()
// 思路：前面中间件将业务处理完交给后面的中间件（next()），若中间出错了（提交数据不合要求或系统错误等）：
// 1.直接发送响应告知错误，结束该中间件服务（return）
// 2.错误情况较多时最后写一个错误中间件，由错误中间件兜底（处理所有可能的错误）发送相应的错误信息
const {checkRegister,register,checkLogin,login} = require('../service/user')
router.post('/register', [checkRegister,register])
router.post('/login', [checkLogin, login])

const {getGroups,addGroup,modifyGroup,deleteGroup}=require('../service/group')
router.get('/groups',getGroups)
router.post('/groups',addGroup)
router.put('/groups/:id',modifyGroup)
router.delete('/groups/:id',deleteGroup)

const {getTasks,addTask,modifyTask,deleteTask}=require('../service/task')
router.get('/groups/:id/tasks', getTasks)
router.post('/groups/:id/tasks', addTask)
router.put('/groups/:id/tasks/:id', modifyTask)
router.delete('/groups/:id/tasks/:id', deleteTask)

module.exports = router

