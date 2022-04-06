// 全局中间件

// 导入 cors 中间件实现跨域问题
const cors = require('cors')
const corsOptions = {
    // 当请求带有cookie响应头Access-Control-Allow不能为*，否则会被同源策略限制
    origin: 'http://127.0.0.1:5502',
    // 当fetch要带有cookie时， Access-Control-Allow-Credentials需要设置为true
    credentials: true
}
exports.cors = cors(corsOptions)

// 导入 body-parser 中间件解析数据
const bodyParser = require('body-parser')
exports.bodyParserJson = bodyParser.json() // 将请求体的json数据解析为js对象，添加到req.body属性上
exports.bodyParserUrlencoded = bodyParser.urlencoded({ extended: true }) // 解析表单提交的数据

// 校验session是否有效的自定义中间件
exports.verifySession = (req, res, next) => {
    // console.log('校验session是否有效的自定义中间件');
    const url = req.url
    if (url !== '/login' && url !== '/register' && url !== '/logout') { // 大部分操作需要检验session
        const { checkSession } = require('../service/user')
        checkSession(req, res, next)
    }
    else {
        // 登录、登出和注册不检验session
        next()
    }
}


