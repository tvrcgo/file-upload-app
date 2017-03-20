const koa = require('koa')
const upload = require('./lib/upload')
const run = require('./lib/runner')

module.exports = (opts) => {
  run(() => {
    const app = new koa()
    app.use(upload(opts))
    app.listen(opts.port || 10080)
  })
}
