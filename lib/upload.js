const formidable = require('formidable')
const os = require('os')

module.exports = (opts = {}) => {
  return (ctx, next) => {
    const form = new formidable.IncomingForm()
    form.uploadDir = opts.dest || os.tmpdir()
    form.keepExtensions = true
    form.multiples = true
    form.maxFields = opts.max || 5
    form.maxFieldsSize = opts.size || 1024 * 1024 * 200
    return new Promise((resolve, reject) => {
      form.parse(ctx.req, (err, fields, files) => {
        return resolve({
          files: Object.keys(files).map(key => files[key]),
          fields
        })
      })
      form.on('error', err => {
        return reject(err)
      })
    }).then((ret) => {
      ctx.body = {
        status: 1,
        files: ret.files
      }
      if (opts.done && typeof opts.done === 'function') {
        opts.done.call(this, ret.files, ret.fields)
      }
    }).catch(err => {
      ctx.body = {
        status: 0,
        error: err.message
      }
    })
  }
}
