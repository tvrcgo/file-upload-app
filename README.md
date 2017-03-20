# file-upload-app

### Install

```shell
npm install file-upload-app --save
```

### Start

```js
const app = require('file-upload-app')

app({
  port: 8100,
  dest: '/home/apps',
  done(files, fields) {

  }
})

```

### Options

- `port` : listen port, default `10080`.
- `dest` : upload dir.
- `max` : max files count.
- `size` : max file size (byte).
- `done` : files handler