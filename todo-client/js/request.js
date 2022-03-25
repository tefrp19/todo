
const ip = "127.0.0.1:8000"//ip与端口号
export const login = (username, password) => {
    const data={username,password}
    return fetch(`http://${ip}/login`, {
        method: 'post',
        headers:{ 'Content-Type': 'application/json' },
        body: JSON.stringify(data)//序列化
    }).then(res =>  res.json())//返回的是一个promise对象
}
// 封装promise对象发送ajax请求
const getAllMatters_ajax = () => {
    //当promise对象被创建时会被立即执行，所以在其外侧包裹一个函数是一个可以控制promise对象较好的做法
    return new Promise((resolve, reject) => {
        //1.创建xhr对象
        const xhr = new XMLHttpRequest()
        // 2.初始化 设置请求方法和url
        xhr.open("get", `http://${ip}/findAllMatters`)
        // 3.发送请求参数
        xhr.send(null)
        // 4.得到响应结果
        xhr.onreadystatechange =
            () => { //这是一个异步操作，相当与给xhr绑定了一个回调函数，findAllMatters函数不会等onreadystatechange执行了再执行，他会直接返回data
                if (xhr.readyState == 4) {
                    resolve(JSON.parse(xhr.response))
                }
            }
    })
}

const getAllMatters_fetch = (token) => {
    return fetch(`http://${ip}/getAllMatters`, {
        method: 'get',
        headers:{Authorization:`Bearer ${token}`}
    }).then(res => {
        return res.json()//返回的是一个promise对象
    })
}

const addMatter_ajax = () => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open('post', `http://${ip}/addMatter`)
        const data = new FormData()
        data.append('name', 'ajax')
        xhr.send(data)
        xhr.onreadystatechange =
            () => {
                if (xhr.readyState == 4) {
                    console.log('添加成功');
                    resolve('添加成功')
                }
            }
    })
}

const addMatter_fetch = (data) => {
    // const data = new FormData()
    // data.append('name', 'fetch')
    console.log(data);

    if (data.deadline === '') data.deadline = null
    console.log(JSON.stringify(data));
    return fetch(`http://${ip}/addMatter`, {
        method: 'post',
        headers:
            // new Headers({
            { 'Content-Type': 'application/json' },
        // }),
        body: JSON.stringify(data)//序列化
    })
}

const deleteMatter = (id) => {
    return fetch(`http://${ip}/deleteMatter/${id}`)
}

export { getAllMatters_fetch as getAllMatters, addMatter_fetch as addMatter, deleteMatter }

