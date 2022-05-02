import { modifyGroup, deleteGroup } from '../api/group.js'
import { addTaskNode, deleteTaskNode, modifyTaskNode } from './dom.js'
import {globalVar} from '../left/index.js'

// 点击分组操作按钮出现下拉框，点击其他地方下拉框消失
const toolbarButton = document.querySelector('.toolbarButton')
const toolbarDetail = document.querySelector('.toolbarDetail')
toolbarButton.addEventListener('click', () => {
    toolbarDetail.style.height = '80px'
    console.log(globalVar);
})
document.addEventListener('click', function (e) {
    
    // 先尝试用事件冒泡捕获能不能解决，再计算坐标
    const target = e.target

    // console.log(target);
    // if (!target.matches('.toolbarDetail')||!target.matches('.rename')||!target.matches('.delete')) {
    //     console.log('下拉框消失');
    // }
    // if (target.className!=='rename') {
    //     console.log('下拉框消失');
    // }
})

// 分组重命名
const groupNameNode = document.querySelector('.groupName')
let oldName
groupNameNode.addEventListener('focus', function (e) {
    oldName = e.target.innerText
})
const modifyGroupEvent = async function (e) {

    const inputValue = e.target.innerText
    if (inputValue !== oldName && inputValue !== '' && (e.type === 'keydown' && e.keyCode === 13 || e.type === 'blur')) {
        e.preventDefault() // 禁用回车换行的默认事件
        console.log(inputValue);
        modifyGroup({
            id:globalVar.nowGroupId,
            name:inputValue
        })
    }
}
groupNameNode.addEventListener('blur', modifyGroupEvent)
groupNameNode.addEventListener('keydown', modifyGroupEvent)
const rename = document.querySelector('.rename')
rename.addEventListener('click', () => {
    // 全选
    const range = document.createRange();
    range.selectNodeContents(groupNameNode);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
})

// 删除分组
const deleteGroupNode = document.querySelector('.delete')
const deleteGroupEvent = () => {
    console.log('删除分组');
}
deleteGroupNode.addEventListener('click', deleteGroupEvent)

globalVar.nowTasksInfo
// 添加新节点
addTaskNode({
    id: 5,
    check: 0,
    name: '任务123',
    important: 0
})

modifyTaskNode({
    id: 5,
    name:'任务456'
})

// 为任务列表添加点击事件：获取任务详情
