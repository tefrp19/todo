import { getUser } from '../api/user.js'
import { getGroups, addGroupApi, deleteGroup, } from '../api/group.js'
import { addGroupNode, modifyGroupNode, deleteGroupNode } from './dom.js'
import { addTaskNode, modifyGroupName, modifyTaskNode } from '../center/dom.js'
import { getTasks } from '../api/task.js';
// 更改用户名
const usernameNode = document.querySelector('.username');
(async () => {
    const res = await getUser()
    const { username } = res.data
    usernameNode.textContent = username
})();

// 添加左侧分组列表（网络请求+渲染节点）
export const addGroups = async () => {
    const {data:groupsInfo} = await getGroups()
    // 添加分组节点
    for (const groupInfo of groupsInfo) {
        addGroupNode(groupInfo)
    }
}
addGroups()

// 记录当前正在操作的分组和任务的id
export const globalVar = {
    nowGroupId: null,
    nowTaskId: null,
    nowTasksInfo: null,
}

// 为分组添列表添加点击事件：获取任务列表
const groupsNode = document.querySelector('.groups')
const changeCenter = async function (e) {
    const target = e.target
    if (target.matches('.groups')) {
        return
    }
    let targetGroupNode
    let groupName
    if (e.target.matches('.group-item')) {
        targetGroupNode = target
    } else if (target.parentNode.dataset.id !== undefined) {
        targetGroupNode = target.parentNode
    }
    // 如果点击是相同的分组则不执行后续操作
    if (targetGroupNode.dataset.id === globalVar.nowGroupId) {
        return
    }
    groupName = targetGroupNode.querySelector('span').textContent
    modifyGroupName(groupName)
    // 切换任务列表：
    // 1.删除原来节点
    // 2.添加新节点：网络请求+渲染dom
    globalVar.nowGroupId = targetGroupNode.dataset.id
    const { data: tasksInfo } = await getTasks(globalVar.nowGroupId)

    globalVar.nowTasksInfo = tasksInfo
    for (const taskInfo of tasksInfo) {
        addTaskNode(taskInfo)
    }
    console.log(tasksInfo);
}
groupsNode.addEventListener('click', changeCenter)

// 为添加分组的输入框添加失去焦点和回车事件
const addGroupInputNode = document.querySelector('.addGroup input')
const addGroupEvent = async function (e) {
    const inputValue = e.target.value
    if (inputValue !== '' && (e.type === 'keydown' && e.keyCode === 13 || e.type === 'blur')) {
        console.log(inputValue);
        await addGroupApi(inputValue)
    }
}
addGroupInputNode.addEventListener('blur', addGroupEvent)
addGroupInputNode.addEventListener('keydown', addGroupEvent)





console.log(globalVar);



