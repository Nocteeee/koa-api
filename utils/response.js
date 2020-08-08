 class ResponseResult {
    static success(data){
        return {
            code:200,
            data:data,
            success:'操作成功'
        }
    }
    static error(code,data){
        return {
            code:code,
            data:data
        }
    }
    static handleError(data){
        return data
    }
    static expired(){
        return {
            status: 405,
            message: 'token 已过期，请重新登陆'
        }
    }
}
module.exports = ResponseResult
