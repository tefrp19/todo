let tasks = document.querySelector('.tasks')
tasks.addEventListener('click', function (e) {
    // e.stopPropagation()
    // console.dir(e.currentTarget);
    const target = e.target
    // 这里有一个奇怪的bug，不能直接判断e.target.className，需要e.target.matches(selector)来判断
    if (target.matches('.task-name')) {
        console.log(target);
        showTaskDetail()
    }
})

const mask = document.querySelector('.mask')
const taskDetail = document.querySelector('.task-detail')

mask.addEventListener('click', function (e) {
    mask.style.display = 'none'
    // 右侧栏不展示
    taskDetail.classList.add('rightColumn-exited')
    taskDetail.classList.remove('rightColumn-entered')

    // 隐藏左侧栏
    if (window.innerWidth<=768){ //
    const aside = document.querySelector('aside')
        aside.classList.add('leftColumn-exited')
        aside.classList.remove('leftColumn-entered')
    }
})

function showTaskDetail(e) {
    const windowInnerWidth = window.innerWidth
    if (windowInnerWidth <= 1200) { // 窗口是小屏或中屏才展示遮罩层

        mask.style.display = 'block'
        // 右侧栏展示
        taskDetail.classList.add('rightColumn-entered')
        taskDetail.classList.remove('rightColumn-exited')
    }
}

// 展示左侧边栏
const menu = document.querySelector('.menu')
menu.addEventListener('click', function (e) {
    const aside = document.querySelector('aside')
    aside.classList.add('leftColumn-entered')
    taskDetail.classList.remove('leftColumn-exited')
    mask.style.display = 'block'
})


const btn = document.querySelector('.submit-task-modification')
const date = document.querySelector('.modify-deadline input[type="date"]')
// console.log(date);
btn.addEventListener('click', () => {
    date.value = '2017-06-01'
})


// 如何知道当前操作的是哪个组里的任务？nowGroupId/nowTaskId

// import {login} from './api/user.js'
// login().then(res=>console.log(res))

