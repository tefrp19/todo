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


const router = express.Router()
// 思路：前面中间件将业务处理完交给后面的中间件（next()），中间出错了：1.直接发送响应告知错误，结束该中间件服务（return）2.错误情况较多时最后写一个错误中间件，由错误中间件兜底（处理所有可能的错误）发送相应的错误信息
const service1Milddleware = (req, res, next) => {
    // 进行业务逻辑
    const { name } = req.body
    console.log(name);
    // 若发生错误
    if(typeof name==='number' ){
        res.send({
            status:500,
            message:'参数类型错误'
        })
        // 发送响应结束业务
        return
    }
    // 否则正常执行下一个业务
    next()
}

const service2Milddleware = (req, res, next) => {
    // 再继续进行业务处理

    res.send({
        status:200,
        message: 'ok'
    })
}

const errorMilddleware = (err, req, res, next) => {
    console.log(err);
    // res.send({
    //     status:500,
    //     message:'服务器出错'
    // })
}
router.post('/test', [service1Milddleware, service2Milddleware, errorMilddleware])



app.use(router)

// 配置一个处理错误的全局中间件
// app.use((err, req, res, next) => {
//     // 当 token 身份校验失败
//     if (err.name === 'UnauthorizedError') {
//         res.send({
//             status: 401,
//             message: '无效的token'
//         })
//         return
//     }
//     console.log('处理错误的全局中间件', err);
//     res.send({
//         status:500,
//         message:'服务器出错'
//     })
// })


app.listen(8000, () => {
    console.log('服务器运行在8000端口');
})