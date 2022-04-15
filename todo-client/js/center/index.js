import second from '../api/group.js'

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