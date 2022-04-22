import { addDetailHeaderNode, addTodayNode, deleteDetailHeaderNode, deleteTodayNode, modifyTaskNote } from "./dom.js";

const detailHeaderNode=document.querySelector('.detail-header')
const taskNameNode=detailHeaderNode.querySelector('.modify-task-name')
taskNameNode.addEventListener('blur',function(e){
    console.log(this.innerText);
})



const dateNode = document.querySelector(('.modify-deadline input'))
dateNode.addEventListener('change', function (e) {
    console.log(e.target.value);
})


// addDetailHeaderNode({
//     check:0,
//     name:'记得完成xxx',
//     import:1,
// })
// deleteDetailHeaderNode()

// addTodayNode(1)
// deleteTodayNode()
// modifyTaskNote('记得xxx')