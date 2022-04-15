const groupsNode = document.querySelector('.groups');

/**
 * 添加分组节点
 * @param {Object} groupInfo 
 * @param {number} groupInfo.id 
 * @param {string} groupInfo.name 
 */
export const addGroupNode = (groupInfo) => {
    const groupNode = document.createElement('li')
    groupNode.classList.add('group-item')
    groupNode.dataset.id = groupInfo.id
    groupNode.innerHTML = `<i class="fa fa-bars"></i> <span>${groupInfo.name}</span>`
    groupsNode.appendChild(groupNode)
}

/**
 * 修改分组节点的信息
 * @param {Object} groupInfo 
 * @param {number} groupInfo.id 
 * @param {string} groupInfo.name 
 */
export const modifyGroupNode=(groupInfo)=>{
    const groupNode=document.querySelector(`.groups [data-id="${groupInfo.id}"] span`)
    groupNode.textContent=groupInfo.name
}

/**
 * 删除分组节点
 * @param {number} groupId 
 */
export const deleteGroupNode=(groupId)=>{
    const groupNode=document.querySelector(`.groups [data-id="${groupId}"]`)
    groupNode.remove()
}