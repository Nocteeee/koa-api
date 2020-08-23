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
    async articleList(p) {
        let pageNo = (p.pageNo || 1) - 1;
        let pageSize = p.pageSize || 10;
        let sql_count = `select count(*) as total  from t_article`;
        let total = await this.query(sql_count);
        let _sql = `select * from t_article order by create_time desc limit ${ pageNo * pageSize } , ${ pageSize };`;
        let article_list = await this.query(_sql)
        return {
            records:article_list,
            total:total[0].total,
            pageNo: +(p.pageNo || 1),
            pageSize: +pageSize
        }
    }
    async getArticleById(_id) {
        let _sql = `select t_article.id,title,submit,is_top,category_id,create_time,modified_time,view,content 
                    from t_article,t_content 
                    where t_article.id = ? 
                    and t_content.article_id = t_article.id;`
        let result = await this.query(_sql, _id);
        let updateView = `update t_article set view = ? where t_article.id = ?`
        await this.query(updateView, [result[0].view + 1, _id]);
        return result
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