const CommonService = require('./sqlConfig')
class UserController extends CommonService {
    constructor() {
        super()
    }
    findUser(params) {
        let _sql = `select * from sys_user where user_name = ? and hashed_password = ?;`
        return this.query(_sql, [params.username, params.password])
    }
    userList() {
        let _sql = "select * from sys_user;"
        return this.query(_sql)
    }
    articleList() {
        let _sql = "select * from t_article group by create_time desc;"
        return this.query(_sql)
    }
    getArticleById(_id) {
        let _sql = `select t_article.id,title,submit,is_top,category_id,create_time,modified_time,content 
                    from t_article,t_content 
                    where t_article.id = ? 
                    and t_content.article_id = t_article.id ;`
        return this.query(_sql, _id)
    }
    async addArticle(p) {
        let _sql = `insert into
                    t_article(title,submit,is_top,category_id,create_time)
                    values (?,?,?,?,?);`;
        let res = await this.query(_sql, [p.title, p.submit, p.is_top, p.category_id, p.create_time])
        let _sql2 = `insert into
                    t_content(article_id,content)
                    values (?,?);`
        return this.query(_sql2, [res.insertId, p.content])
    }
    modifyArticle(p) {
        let _sql = `update t_article t_a left join t_content t_c on
                t_c.article_id = t_a.id
                set
                t_a.title=?,t_a.submit=?,t_a.is_top=?,t_a.category_id=?,t_a.modified_time=?,t_c.content=?
                where t_a.id= ? and t_a.id = t_c.article_id`;
        return this.query(_sql, [p.title, p.submit, p.is_top, p.category_id, p.modified_time, p.content, p.id])
    }
    async deleteArticle(p) {
        console.log('params: ', p);
        let _sql = `delete from t_content where article_id=?`;
        await this.query(_sql, p.id)
        let _sql2 = `delete from t_article where id=?`;
        return this.query(_sql2, p.id)
    }

    //分类
    category() {
        let _sql = `select * from t_category`;
        return this.query(_sql)
    }
}

module.exports = new UserController()