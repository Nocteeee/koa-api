const config = {
    // 启动端口
    port: 1235,

    // 数据库配置
    database: {
        database: 'blog',
        user: 'root',
        password: 'nian569563',
        host: 'localhost',
        connectionLimit: 10,
        queueLimit: 0,
        port: 3306
    }
}

module.exports = config