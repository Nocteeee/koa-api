const config = {
    // 启动端口
    port: 1919,

    // 数据库配置
    database: {
        database: 'blog',
        user: 'root',
        password: 'nian569563',
        host: '101.133.167.101',
        connectionLimit: 10,
        queueLimit: 0,
        port: 3306
    }
}

module.exports = config