var chai = require('chai')
chai.should()

var Stream = require('stream').Stream
var levelMem = require('level-mem')
var concat = require('concat-stream')

describe('level-export', function () {
  var levelExport = require('../')
  
  it('can dump a leveldb to a json stream', function (done) {

    var db = levelMem('test')
    db.batch([
    {type: 'put', key:'a', value: 'o'},
    {type: 'put', key:'b', value: 'm'},
    {type: 'put', key:'c', value: 'g'}
      ], function (err) {
        if(err) { return done(err) }

        var stream = levelExport(db)
        
        stream.should.be.instanceof(Stream)
        
        stream.pipe(concat(function (val) {
          val.should.equal(
            '[\n' +
            '{"key":"a","value":"o"},\n' +
            '{"key":"b","value":"m"},\n' +
            '{"key":"c","value":"g"}\n' +
            ']'
          )
          done()    
        }))

      })
  })

  it('can pass start and stop opts to levelUP', function (done) {


    var db = levelMem('test')
    db.batch([
    {type: 'put', key:'a', value: 'o'},
    {type: 'put', key:'b', value: 'm'},
    {type: 'put', key:'c', value: 'g'},
    {type: 'put', key:'d', value: '!'}
      ], function (err) {
        if(err) { return done(err) }

        var stream = levelExport(db, {
          start: 'b',
          end: 'c'
        })
        
        stream.should.be.instanceof(Stream)
        
        stream.pipe(concat(function (val) {
          val.should.equal(
            '[\n' +
            '{"key":"b","value":"m"},\n' +
            '{"key":"c","value":"g"}\n' +
            ']'
          )
          done()    
        }))

      })

  })
})