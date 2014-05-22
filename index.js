var wrap = require('wrap-stream')
var join = require('join-stream2')
var through = require('through2')

function levelExport (db, opts) {

  return db.createReadStream(opts)
    .pipe(through.obj(function (chunk, enc, cb) {
      this.push(JSON.stringify(chunk))
      cb()
    }))
    .pipe(join(',\n'))
    .pipe(wrap('[\n','\n]'))
}

module.exports = levelExport