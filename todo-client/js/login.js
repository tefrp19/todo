import {login} from './request.js'
const form=document.querySelector('.login')
form.addEventListener('submit',e=>{
    // 阻止表单默认提交
    e.preventDefault()
    // 获取表单值
    const username=document.querySelector('input[placeholder="Username"]').value
    const password=document.querySelector('input[placeholder="Password"]').value
    // checkUsername(username)
    // console.log(username,password);
    login(username,password).then(res=>{
        console.log(res);
        // 登录成功
        // if (res.status===200) {
        //     const token=res.data
        //     location.href='/index.html'
        //     localStorage.setItem('token',token)
        // }else{
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