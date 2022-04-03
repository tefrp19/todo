# 简介
这是使用 node.js 发开的后端小demo，实现了基本的 CRUD 功能。

# 使用模块
- nodemon（全局安装） 当代码发生更改时重新启动服务器
- express 框架
- cors 模块解决跨域问题
- body-parser 模块处理 json 数据
- mysql 模块实现数据库连接
- express-session 模块生成cookie和session
- redis 模块
- connect-redis 模块
- node-schedule 模块用于定时任务：每日零点将所有任务的today状态设为false

# 如何运行项目
1. 进入项目目录，执行 `npm install`
2. `node app.js` 开启服务器