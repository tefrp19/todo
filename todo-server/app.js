const express = require('express')
// 创建服务器的实例对象
const app = express()

// 注意中间件顺序问题
const { cors, bodyParserJson, bodyParserUrlencoded, verifySession, setTodayTasksFasle } = require('./src/service/app')

// 解决跨域中间件
app.use(cors)

// 解析数据中间件
app.use(bodyParserJson)
app.use(bodyParserUrlencoded)

// redis中间件
const createSession = require('./src/db/redis')
app.use(createSession())

// 校验session是否有效 
app.use(verifySession)

setTodayTasksFasle()
// 导入路由（api）
const api = require('./src/controller/api')
const { Model } = require('./src/model/model')
app.use(api)
app.use((err, req, res, next) => {
    switch (err) {
        case 'paramsError':
            res.send(new Model(400, '传入参数有误'))
            break;

        default:
            console.log('服务端出错');
            res.send(new Model(500, '服务端出错'))
            break;
    }
})
app.listen(8000, () => {
    console.log('服务器运行在8000端口');
})