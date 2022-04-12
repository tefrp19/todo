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

// 检验前端传来是否为有效的字段（需要的字段是否有值）
/**
 * 
 * @param {obj} params 
 * @param {Array} needCheckParams 
 * @returns 
 */
exports.checkParams=(params,needCheckParams)=>{
    for (const param of needCheckParams) {
        if (!params[param]) {
            return false
        }
        
    }
    return true
}

// 校验session是否有效的自定义中间件
exports.verifySession = (req, res, next) => {
    // console.log('校验session是否有效的自定义中间件');
    const url = req.url
    if (url !== '/login' && url !== '/register') { // 大部分操作需要检验session
        const { checkSession } = require('../service/user')
        checkSession(req, res, next)
    }
    else {
        // 登录、登出和注册不检验session
        next()
    }
}

// 定时任务，每天0点将所有任务today置为false
exports.setTodayTasksFasle = () => {
    const schedule = require('node-schedule');
    const { exec } = require('../db/mysql')

    schedule.scheduleJob('0 0 0 * * *', async () => {
        const sql = 'update task set today=0;'
        await exec(sql)
        console.log('执行定时任务，时间：' + new Date());
    });

}

exports.handleException=(req,res,next)=>{

}
