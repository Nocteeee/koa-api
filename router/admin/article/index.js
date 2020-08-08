const AdminController = require('../../../controllers/adminController');
const responseResult = require('../../../utils/response')

module.exports = ( router ) => {
    //获取文章list
    router.get('/articleList', async ctx => {
        let result = await AdminController.articleList();
        ctx.body = responseResult.success(result)
    })

    //根据id 获取文章
    router.get('/getArticleById', async ctx => {
        let params = ctx.request.query;
        let result = await AdminController.getArticleById(params.id)
        ctx.body = responseResult.success(result[0])
    })

    //添加文章
    router.post('/addArticle', async ctx => {
        let params = ctx.request.body;
        let result = await AdminController.addArticle(params)
        if(result && result.insertId){
            ctx.body = responseResult.success()
        }else{
            ctx.body = responseResult.error(-1,'操作失败')
        }
    })

    //修改文章
    router.post('/modifyArticle', async ctx => {
        let params = ctx.request.body;
        params.modified_time = new Date().toLocaleDateString().replace('/','-')
        await AdminController.modifyArticle(params)
        ctx.body = responseResult.success()
    })

    //删除文章
    router.post('/deleteArticle', async ctx => {
        let params = ctx.request.body;
        await AdminController.deleteArticle(params)
        ctx.body = responseResult.success()
    })


    //获取文章分类
    router.get('/category', async ctx => {
        let result = await AdminController.category()
        ctx.body = responseResult.success(result)
    })
}