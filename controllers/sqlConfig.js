//mysqlConfig.js


// function handleError() {
//     pool.getConnection(function (err, conn) {
//         if (err) {
//             console.log(err)
//         } else {
//             this.conn = conn
//         }
//     })
// }

class CommonService {
    query(sql, values) {
        return new Promise((resolve, reject) => {
            global.connection.query(sql, values, (err, rows) => {
                if (err) {
                    global.log.error(err)
                    reject(err)
                } else {
                    global.log.info(rows)
                    resolve(rows)
                }
                pool.releaseConnection(global.connection)
            })
        })
    }
}

module.exports = CommonService;