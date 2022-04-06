const {redisClient}=require('../conf/db')
const session = require('express-session')

redisClient.connect().catch(err => {
    console.log('redis连接失败:', err);
})
let RedisStore = require("connect-redis")(session)

module.exports= createSession = () => {
   return session({
        store: new RedisStore({ client: redisClient }),
        cookie:{
            maxAge:24*60*60*1000,
        },
        saveUninitialized: false,
        secret: "keyboard cat",
        resave: false,
        unset:'destroy',// 当session被删除时，redis中对应的数据项删除
        name:'todoSessionId',//Set-Cookie中cookie的名字
    })
}