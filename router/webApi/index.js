const AdminController = require('../../controllers/adminController');
const responseResult = require('../../utils/response')

module.exports = ( router ) => {
    //获取文章list
    router.get('/web/articleList', async ctx => {
        let params = ctx.request.query
        let result = await AdminController.articleList(params);
        ctx.body = responseResult.success(result)
    })

    //根据id 获取文章
    router.get('/web/getArticleById', async ctx => {
        let params = ctx.request.query;
        let result = await AdminController.getArticleById(params.id)
        ctx.body = responseResult.success(result[0])
    })
}