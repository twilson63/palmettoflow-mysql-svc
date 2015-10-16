var response = require('palmettoflow-event').response
var responseError = require('palmettoflow-event').responseError

var mysql = require('mysql')
var parse = require('node-sqlparser').parse
var stringify = require('node-sqlparser').stringify


module.exports = function (config, ee) {
  var conn = mysql.createConnection(config)

  ee.on('/mysql/query', function (event) {
    if (!event.object.sql) {
      return ee.emit('send', responseError(event, { message: 'SQL required!'}))
    }

    var sqlObj = parse(event.object.sql)
    if (!sqlObj.limit) {
      sqlObj.limit = [{ type: 'number', value: 0}, { type: 'number', value: '500'}]
    }
    var sql = stringify(sqlObj)
    conn.query(sql, function (err, rows) {
      if (err) { return ee.emit('send', responseError(event, err)) }
      ee.emit('send', response(event, rows))
    })
  })
}