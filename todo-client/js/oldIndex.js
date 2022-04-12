import {getAllMatters, addMatter, deleteMatter} from './request.js'
const token=localStorage.getItem('token')

function setAllMatters() {

    //网络请求
    getAllMatters(token).then(res => {

        addElementNodes(res.data)
        bindEventForDel()
        // console.log("setAllMatters");
    })

    // DOM操作
    const addElementNodes = (data) => {
        console.log(data);
        // 节点有多种类型，最常用的是元素节点和文本节点
        // 1.选中tbody元素节点
        let tbody = document.getElementById('todoList').getElementsByTagName('tbody')[0]
        // 2.删除tbody节点中所有元素节点
        while (tbody.firstElementChild) { //
            tbody.removeChild(tbody.firstElementChild);
        }
        // 3.遍历data添加数据
        for (let i = 0; i < data.length; i++) {
            const tr = document.createElement('tr')
            const keys = Object.keys(data[i]);

            [keys[1], keys[2]] = [keys[2], keys[1]] //利用es6解构赋值交换两数要小心这条语句被解析成其他形式！！！
            for (const key of keys) {
                let td = document.createElement('td')
                const str = data[i][key]
                if (str !== null) {
                    td.innerHTML = str
                }
                tr.append(td)
            }
            const td = document.createElement('td')
            td.innerHTML = "<button>删除</button>"
            tr.appendChild(td);
            tbody.append(tr)

        }

    }

    // 为删除按钮绑定事件
    const bindEventForDel = () => {
        const trs = document.getElementById('todoList').getElementsByTagName('tbody')[0].getElementsByTagName('tr')

        for (let i = 0; i < trs.length; i++) {
            trs[i].lastElementChild.firstElementChild.onclick = function () {//这里应该使用传统函数不应该使用箭头函数，会丢失this
                const tr = this.parentElement.parentElement
                const id = tr.firstElementChild.innerHTML
                deleteMatter(id).then(
                    tr.remove()//删除对应行
                )

            }

        }

    }
}

setAllMatters()

const form = document.getElementById('addMatter').firstElementChild
const btn = form.getElementsByTagName('button')[0]
btn.onclick = function () {
    const name = document.getElementById('matterName').value
    const remarks = document.getElementById('remarks').value

    const deadline = document.getElementById('deadline').value.replace('T', ' ')

    const data = {
        name: name,
        remarks: remarks,
        deadline: deadline,
    }
    addMatter(data).then(() => {
        setAllMatters();

    })

}

