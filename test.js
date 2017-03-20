const app = require('./index')

app({
  port: 8100,
  done(files, fields) {
    console.log('files', files)
    console.log('fields', fields)
  }
})
