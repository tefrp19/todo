# 简介
这是使用 node.js 发开的后端小demo，实现了基本的 CRUD 功能。

# 使用模块
- nodemon（全局安装） 当代码发生更改时重新启动服务器
- express 框架
- cors 模块解决跨域问题
- body-parser 模块处理 json 数据
- mysql 模块实现数据库连接
- jsonwebtoken 模块用于生成 JWT 字符串
- express-jwt 模块用于将 JWT 字符串解析还原成 JSON 对象

# 如何运行项目
1. 进入项目目录，执行 `npm install`
2. `node app.js` 开启服务器