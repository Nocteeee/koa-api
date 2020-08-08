module.exports = {
  apps: [{
    script: 'app.js',
    watch: './'
  }, {
    script: './service-worker/',
    watch: ['./service-worker']
  }],

  deploy: {
    production: {
      user: 'root',
      host: '101.133.167.101',
      ref: 'origin/master',
      repo: 'https://github.com/Nocteeee/koa-api.git',
      path: '/website/koa-api',
      'post-deploy': 'yarn install && pm2 reload ecosystem.config.js --env production',
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
};