
const { exec } = require('../src/db/mysql');
const escape = require('mysql').escape;// 防止 sql 注入
((req, res) => {
    let userName = 'admin\'-- '
    console.log(userName);
    // 防止 sql 注入
    userName = escape(userName)

    const sql = `SELECT matter.id,user_name,status,remarks,deadline FROM matter JOIN user ON matter.user_id=user.id WHERE user_name='${userName}';`
    exec(sql).then(reslut => {
        console.log(reslut);
    }).catch(err => {
        console.log('捕获',err);
    })
})()