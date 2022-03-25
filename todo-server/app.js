const express = require('express')
// 创建服务器的实例对象
const app = express()

// 注意中间件顺序问题

// 导入 cors 中间件实现跨域问题
const cors = require('cors')
app.use(cors())

// 配置 body-parser 中间件处理 json 数据
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// 配置 express-jwt 中间件解析 token 生成 JSON 对象
const expressJWT = require('express-jwt')
    ({
        secret: '123456',
        algorithms: ['HS256']
    })
    // 符合路径的不用进行 token 检查
    .unless({ path: ['/login', '/register','/crosTest'] })


app.use(expressJWT)

// 配置一个处理错误的全局中间件
app.use((err, req, res, next) => {
    console.log('处理错误的全局中间件',err);
    // 当 token 身份校验失败
    if (err.name === 'UnauthorizedError') {
        res.send(new Model(401, '验证失败，无效的token'))
        return
    }

    if (err.type === 'entity.parse.failed') {
        res.send(new Model(400, '请求语法错误'))
        return
    }
})

// 导入路由（api）
const api = require('./src/controller/api')
const { Model } = require('./src/model/model')
app.use(api)
// console.log(process.env.NO);

app.listen(8000, () => {
    console.log('服务器运行在8000端口');
})