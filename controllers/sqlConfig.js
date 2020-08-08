//mysqlConfig.js
var mysql = require('mysql2');
var config = require('../config/default');
var pool = mysql.createPool(config.database);
global.connection = pool

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
                    global.logger.error(err)
                    reject(err)
                } else {
                    global.logger.info(rows)
                    resolve(rows)
                }
                pool.releaseConnection(global.connection)
            })
        })
    }
}

module.exports = CommonService;