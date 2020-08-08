// 单独的创建一个中间件，然后在app.js中注册使用
const jwt = require('jsonwebtoken')
const responseUtil = require('../../utils/response')
async function check(ctx, next) {
    let url = ctx.url.split('?')[0]
    // 如果是登陆页面和注册页面就不需要验证token了
    if (url === '/admin/login' || url === '/admin/register' || url.includes('web')) {
        await next()
    } else {
        // 否则获取到token
        let token = ctx.request.headers["authorization"]
        if (token) {
            // 如果有token的话就开始解析
            try {
                let tokenItem = jwt.verify(token, 'token')
                // 将token的创建的时间和过期时间结构出来
                const { iat, exp } = tokenItem
                // 拿到当前的时间
                let data = Math.floor(+new Date() / 1000);
                // 判断一下如果当前时间减去token创建时间小于或者等于token过期时间，说明还没有过期，否则过期
                if (data - iat <= exp) {
                    // token没有过期
                    await next()
                } else {
                    ctx.body = responseUtil.expired()
                }
            } catch (error) {
                console.log('error: ', error);
                global.logger.error(error)
                ctx.body = responseUtil.handleError(error)
            }
        }else{
            ctx.body = {
                status: 401,
                message: '用户未登陆，请登陆在试~'
            }
        }
    }
}

module.exports = check