import { getUser } from '../api/user.js'
import { getGroups, addGroup, deleteGroup, } from '../api/group.js'
import { addGroupNode, modifyGroupNode, deleteGroupNode } from './dom.js'
// 更改用户名
const usernameNode = document.querySelector('.username');
(async () => {
    const res = await getUser()
    const { username } = res.data
    usernameNode.textContent = username
})()

// 获取分组列表
const groupsNode = document.querySelector('.groups');
(async () => {
    const res = await getGroups()
    const groupsInfo = res.data
    // 添加分组节点
    for (const groupInfo of groupsInfo) {
        addGroupNode(groupInfo)
    }
})()

// 为添加分组的输入框添加失去焦点和回车事件
const addGroupInputNode = document.querySelector('.addGroup input')
const addGroupEvent = async function (e) {
    const inputValue = e.target.value
    if (inputValue !== '' && (e.type === 'keydown' && e.keyCode === 13 || e.type === 'blur')) {
        console.log(inputValue);
        await addGroup(inputValue)
    }
}
addGroupInputNode.addEventListener('blur', addGroupEvent)
addGroupInputNode.addEventListener('keydown', addGroupEvent)

// 记录当前正在操作的分组和任务的id
export const globalVar = {
    nowGroupId:null,
    nowTaskId:null,
}



console.log(globalVar);



