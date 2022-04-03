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
        name:'todoSessionId',//Set-Cookie中cookie的名字
    })
}