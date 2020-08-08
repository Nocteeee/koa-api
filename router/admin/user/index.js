const AdminController = require('../../../controllers/adminController');
const responseResult = require('../../../utils/response')
var jwt = require('jsonwebtoken');

module.exports = ( router ) => {
    router.post('/login', async ctx => {
        let params = ctx.request.body;
        let result = await AdminController.findUser(params);
        let response = null;
        if(result && result.length){
            var token = jwt.sign( params , 'token', { expiresIn: '24h' });
            result[0].token = token;
            delete result[0].hashed_password;
            response = responseResult.success(result[0]);
        }else{
            response = responseResult.error('-1','用户名或密码错误');
        }
        ctx.body = response;
    })

    router.get('/list', async ctx => {
        let result = await AdminController.userList()
        ctx.body = responseResult.success(result)
    })
}