const Koa = require('koa')
const app = new Koa();
const router = require('koa-router')();
var config = require('./config/default');
const bodyParser = require('koa-bodyparser');
const Log = require('./middleware/log/logger');
const { getIPAdress } = require('./utils/util')
const checkToken = require('./middleware/jwt/')
// const cors = require('koa2-cors')


// app.use(async (ctx, next) => {
//     ctx.set('Access-Control-Allow-Origin', '*');
//     ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With ');
//     ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
//     if (ctx.method == 'OPTIONS') {
//         ctx.body = 200;
//     } else {
//         await next();
//     }
// });

app
    .use(Log({
        env: app.env, // koa 提供的环境变量
        projectName: 'back-API',
        appLogLevel: 'debug',
        dir: 'logs',
        serverIp: getIPAdress()
    }))
    // .use(cors())
    .use(bodyParser())
    .use(checkToken)
    .use(router.routes())
    .use(router.allowedMethods());


require('./router/index')(router)

app.listen(config.port)