const express = require('express')
// 创建服务器的实例对象
const app = express()

// 注意中间件顺序问题

// 导入 cors 中间件实现跨域问题
const cors = require('cors')
const corsOptions = {
    // 当请求带有cookie响应头Access-Control-Allow不能为*，否则会被同源策略限制
    origin: 'http://127.0.0.1:5502',
    // 当fetch要带有cookie时， Access-Control-Allow-Credentials需要设置为true
    credentials: true
}
app.use(cors(corsOptions))
// 配置 body-parser 中间件处理 json 数据
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const createSession = require('./src/db/redis')
app.use(createSession())

// 校验 session是否有效 
app.use((req, res, next) => {
    const url = req.url
    console.log('全局中间件', req.url);
    if (url !== '/login' && url !== '/register') {
        console.log(req.session);
        if (!req.session.userId) {
            res.send({
                message: 'session过期，重新登录'
            })
        } else {
            next()
        }
    } else {
        next()
    }
})

// 配置一个处理错误的全局中间件
app.use((err, req, res, next) => {
    console.log('处理错误的全局中间件', err);
    // 当 token 身份校验失败
    if (err.name === 'UnauthorizedError') {
        res.send(new Model(401, '验证失败，无效的token'))
        return
    }

    if (err.type === 'entity.parse.failed') {
        res.send(new Model(400, '请求语法错误'))
        return
    }
    res.send(new Model(500, '服务端出错了'))
})

// 导入路由（api）
const api = require('./src/controller/api')
const { Model } = require('./src/model/model')
app.use(api)
// console.log(process.env.NO);

app.listen(8000, () => {
    console.log('服务器运行在8000端口');
})