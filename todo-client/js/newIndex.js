let tasks = document.querySelector('.tasks')
tasks.addEventListener('click',function (e) {
    // e.stopPropagation()
    // console.dir(e.currentTarget);
    const target=e.target
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
    // 左侧栏消失
    const aside = document.querySelector('aside')
    aside.style.width = '0'
})

function showTaskDetail(e) {
    console.log();
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
    aside.style.width = '15rem'
    mask.style.display = 'block'
})

// 取消默认右键菜单功能
tasks.addEventListener('contextmenu',function (e) {
    e.preventDefault()
    console.log(123);
})

