let taskItems = document.querySelector('.matters').children
for (let i = 0; i < taskItems.length; i++) {
    const item = taskItems[i]
    item.addEventListener('click', showTaskDetail)
}
const mask = document.querySelector('.mask')
const taskDetail=document.querySelector('.task-detail')

mask.addEventListener('click', function (e) {
    mask.style.display = 'none'
    // 右侧栏不展示
    taskDetail.classList.add('rightColumn-exited')
    taskDetail.classList.remove('rightColumn-entered')
})

function showTaskDetail(e) {
    console.log();
    const windowInnerWidth=window.innerWidth
    if (windowInnerWidth<=1200) { // 窗口是小屏或中屏才展示遮罩层
        
        mask.style.display = 'block'
        // 右侧栏展示
        taskDetail.classList.add('rightColumn-entered')
        taskDetail.classList.remove('rightColumn-exited')
    }
}

