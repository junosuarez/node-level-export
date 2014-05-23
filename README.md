# level-export
export a level-db database to a JSON stream

see also: [level-import](https://npm.im/level-import)

## usage
```js
var levelExport = require('level-export')

levelExport(levelUPdb)
  .pipe(process.stdout)
```
outputs
```console
[
{"key":"a","value":"o"},
{"key":"b","value":"m"},
{"key":"c","value":"g"}
]
```

## api

### `levelExport(db: Object, opt: Object) => ReadableStream`

Creates a readable JSON stream from a LevelUP database instance. This stream is suitable for dumping to a file for backup purposes.

`opt` can have the following options:

- `start` : string. start of export key range
- `end` : string. end of export key range


## installation

    $ npm install level-export


## running the tests

From package root:

    $ npm install
    $ npm test


## prior art

- [level-to-json](https://github.com/kesla/level-to-json) - returns the whole db as a single JavaScript object. `level-export` uses a streaming interface instead and outputs JSON-serialized strings suitable for piping to a file or other destination.

## contributors

- jden <jason@denizac.org>


## license

ISC. (c) MMXIV jden <jason@denizac.org>. See LICENSE.md
