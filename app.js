const Koa = require('koa')
const app = new Koa();
const router = require('koa-router')();
var config = require('./config/default');
const bodyParser = require('koa-bodyparser');
const Log = require('./middleware/log/logger');
const { getIPAdress } = require('./utils/util')
const checkToken = require('./middleware/jwt/')
const cors = require('koa2-cors')


app.use(Log({
    env: app.env, // koa 提供的环境变量
    projectName: 'back-API',
    appLogLevel: 'debug',
    dir: 'logs',
    serverIp: getIPAdress()
}))

app
    .use(bodyParser())
    .use(checkToken)
    .use(cors())
    .use(router.routes())
    .use(router.allowedMethods());


require('./router/index')(router)

app.listen(config.port)