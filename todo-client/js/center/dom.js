/**
 * 修改分组名字
 * @param {string} name 
 */
export const modifyGroupNodeName = (name) => {
    document.querySelector('.groupName').textContent = name
}

/**
 * 添加任务节点
 * @param {Object} taskInfo
 * @param {number} taskInfo.id
 * @param {number} taskInfo.check
 * @param {string} taskInfo.name
 * @param {number} taskInfo.important
 */
export const addTaskNode = (taskInfo) => {
    const noCheckedTasksNode = document.querySelector('.tasks')
    const checkedTasksNode = document.querySelector('.tasks.checked')
    const taskNode = document.createElement('li')
    taskNode.classList.add('task-item')
    taskNode.dataset.id = taskInfo.id
    // 右侧importance
    let importanceNode
    if (taskInfo.important === 1) {
        importanceNode = ` <div class="importance" style="color:#0062cc ;"><i class="fa fa-star"></i></div>`
    }
    else {
        importanceNode = ` <div class="importance"><i class="fa fa-star-o"></i></div>`
    }

    // 左侧checkBox
    let checkBoxNode
    if (taskInfo.check === 0) {
        checkBoxNode = `<div class="checkBox">
        <i class="fa fa-circle-thin"></i>
        <i class="fa fa-check-circle-o"></i>
    </div>`

    } else {
        checkBoxNode = `<div class="checkBox">
        <i class="fa fa-check-circle"></i>
    </div>`
    }

    taskNode.innerHTML = `
        ${checkBoxNode}
        <span class="task-name">${taskInfo.name}</span>
        ${importanceNode}
    `
    if (taskInfo.check === 0) {
        noCheckedTasksNode.appendChild(taskNode)
    } else {
        checkedTasksNode.appendChild(taskNode)
    }


}

/**
 * 修改任务节点
 * @param {Object} taskInfo 
 * @param {number} taskInfo.id 
 * @param {string} taskInfo.name 
 */
export const modifyTaskNode = (taskInfo) => {
    const taskNode = document.querySelector(`[data-id="${taskInfo.id}"]`)
    taskNode.querySelector('.task-name').textContent = taskInfo.name
}

/**
 * 删除任务节点
 * @param {number} taskId 
 */
export const deleteTaskNode = (taskId) => {
    const taskNode = document.querySelector(`[data-id="${taskId}"]`)
    console.log(taskNode);
    taskNode.remove()
}