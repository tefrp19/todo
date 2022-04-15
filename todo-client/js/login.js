import {login} from './api/user.js'

const form = document.querySelector('.login')
form.addEventListener('submit', e => {
    console.log(123)
    // 阻止表单默认提交
    e.preventDefault()
    // 获取表单值
    const username = document.querySelector('input[placeholder="Username"]').value
    const password = document.querySelector('input[placeholder="Password"]').value
    const data = {username, password}
    login(data).then(res => {
        console.log(res);

        // 登录成功
        // if (res.status === 200) {
        //     location.href = '/todo-client/index.html'
        // } else {
        //     console.log('登录失败');
        // }
    })
})
// const loginBtn = document.querySelector('.login-btn')
// loginBtn.addEventListener('click',(e)=>{
// 校验


// 登录成功
// console.log(e);
// }) 


// function checkUsername(username) {

// }