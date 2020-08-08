const user = require('./admin/user')
const article = require('./admin/article')
const web = require('./webApi/index')

module.exports = (router) => {
    router.prefix('/admin')
    user(router);
    article(router)
    web(router);
}