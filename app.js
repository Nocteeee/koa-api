const Koa = require('koa')
const app = new Koa();
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const Log = require('./middleware/log/logger');
const { getIPAdress } = require('./utils/util')
const checkToken = require('./middleware/jwt/')
var mysql = require('mysql2');
// var config = require('../config/default');
var config;
const cors = require('koa2-cors')
config = (app.env === 'development' ? require('./config/devConfig') : require('./config/default'))
var pool = mysql.createPool(config.database);
!(global.pool) && (global.pool = pool);
global.connection = pool;

app
    .use(Log({
        env: app.env, // koa 提供的环境变量
        projectName: 'back-API',
        appLogLevel: 'debug',
        dir: 'logs',
        serverIp: getIPAdress()
    }))
    .use(cors())
    .use(bodyParser())
    .use(checkToken)
    .use(router.routes())
    .use(router.allowedMethods());


require('./router/index')(router)

app.listen(config.port)