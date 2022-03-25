class Model {
    /**
     * 将响应对象抽象成模型（类）。传入一个参数默认成功响应，数据为传入的参数；传入两个参数默认响应失败，第一个参数作为状态码，第二个参数为错误信息
     */
    constructor() {
        this.status = 200
        this.message = 'ok'
        this.data = null
        if (arguments.length === 1) {
            this.data = arguments[0]
        }
        else if (arguments.length === 2) {
            this.status = arguments[0]
            this.message = arguments[1]
        }
    }

}


module.exports = {
    Model
}
