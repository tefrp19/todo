try {

    // 同步操作
    // const randomNum = Math.floor(Math.random() * 10)
    // if (randomNum % 2 === 0) {
    //     console.log('同步操作成功');
    // } else {
    //     throw Error('同步操作的error')
    // }

    // 的异步操作
    // setTimeout(() => {
    //     const randomNum = Math.floor(Math.random() * 10)
    //     if (randomNum % 2 === 0) {
    //         console.log('异步操作成功，可执行后续操作');
    //     } else {
    //         throw Error('异步操作的error') // 在异步操作中不能通过try catch 的方式进行异常捕获
    //     }
    // }, 1000)

} catch (error) {
    // 错误处理
    console.log('捕获到错误：', error);
}

// 正确的异步操作处理错误
const readData = new Promise((resolve, reject) => {
    // 1秒后读取数据
    setTimeout(() => {
        const randomNum = Math.floor(Math.random() * 10)
        if (randomNum % 2 === 0) {
            console.log('异步操作成功，可执行后续操作');
            const data = {username: 123}
            // 成功获取到数据（可能是I/O或网络）传递下去
            resolve(data)
        } else {
            // 未成功获取到数据
            reject('失败了')
        }
    }, 1000)
})
 
readData.then(res=>{
    console.log('获取的数据为：',res);
}).catch(res=>{
    // 进行错误处理
    console.log(res);
})

