/**
 * 添加任务详情头部的节点
 * @param {Object} tasksInfo 
 * @param {number} tasksInfo.check 
 * @param {string} tasksInfo.name 
 * @param {number} tasksInfo.import 
 */
export const addDetailHeaderNode = (tasksInfo) => {
    const detailHeaderNode = document.createElement('div')
    detailHeaderNode.classList.add('detail-header')
    detailHeaderNode.classList.add('task-detail-item')
    let checkBoxNode
    if (tasksInfo.check === 1) {
        detailHeaderNode.classList.add('checked')
        checkBoxNode = ` <div class="checkBox ">
        <i class="fa fa-check-circle"></i>
    </div>`
    } else {
        checkBoxNode = `<div class="checkBox">
        <i class="fa fa-circle-thin"></i>
        <i class="fa fa-check-circle-o"></i>
    </div>`
    }
    let importanceNode
    if (tasksInfo.import === 1) {
        importanceNode = ` <div class="importance">
        <i class="fa fa-star" style="color: #0062cc;"></i>
    </div>`
    } else {
        importanceNode = ` <div class="importance">
        <i class="fa fa-star-o"></i>
    </div>`
    }

    detailHeaderNode.innerHTML = `${checkBoxNode}
    <div class="modify-task-name" contenteditable="true">${tasksInfo.name}</div>
    ${importanceNode}
    `
    // 插入
    document.querySelector('.task-detail .warpper').insertBefore(detailHeaderNode, document.querySelector('.modify-deadline'))

}

/**
 * 删除任务详情头部的节点
 */
export const deleteDetailHeaderNode = () => {
    const detailHeaderNode = document.querySelector('.detail-header')
    detailHeaderNode.remove()
}

/**
 * 添加add-to-today按钮节点
 * @param {number} isToday 
 */
export const addTodayNode = (isToday) => {
    const todayNode = document.createElement('button')
    todayNode.classList.add('add-to-toay')
    todayNode.classList.add('task-detail-item')
    if (isToday === 1) {
        todayNode.setAttribute('style', 'color:#0062cc ;')
        todayNode.innerHTML = `<i class="fa fa-sun-o"></i>
        <span>取消添加到“我的一天”</span>`
    } else {
        todayNode.innerHTML = `<i class="fa fa-sun-o"></i>
        <span>添加到“我的一天”</span>`
    }

    // 插入
    document.querySelector('.task-detail .warpper').insertBefore(todayNode, document.querySelector('.modify-note'))
}

/**
 * 删除add-to-today按钮节点
 */
export const deleteTodayNode = () => {
    const todayNode = document.querySelector('.add-to-toay')
    todayNode.remove()
}

/**
 * @param {string} note 
 */
export const modifyTaskNote = (note) => {
    document.querySelector('.modify-note').textContent=note
}

