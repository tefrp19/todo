const ip = '127.0.0.1:8000'

const fetchData = (path, method, params) => {
    return fetch(`//${ip}${path}`, {
        method,
        // 默认fetch请求不带上cookie
        credentials: "include",
        // 配置MIME请求类型，以保证服务端能正确解析json数据
        headers: {
            'Content-Type': 'application/json',
        },
        body: params?JSON.stringify(params):null,
    }).then(res => res.json())
};
export default fetchData 