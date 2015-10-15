var test = require('tap').test
var newEvent = require('palmettoflow-event').newEvent
var svc = require('../')
var palmetto = require('palmettoflow-nodejs')
var ee = palmetto()

svc({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'mysql'
}, ee)

test('run query', function (t) {
  var ne = newEvent('mysql', 'query', {
    sql: 'show tables'
  })
  ee.once(ne.from, function (event) {
    console.log(event)
    t.ok(true)
    t.end()
  })
  ee.emit('send', ne)
})