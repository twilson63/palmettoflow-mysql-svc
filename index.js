var response = require('palmettoflow-event').response
var responseError = require('palmettoflow-event').responseError

var mysql = require('mysql')

module.exports = function (config, ee) {
  var conn = mysql.createConnection(config)

  ee.on('/mysql/query', function (event) {
    conn.connect(function () {
      conn.query(event.object.sql, function (err, rows) {
        conn.end()
        if (err) { return ee.emit('send', responseError(event, err)) }
        ee.emit('send', response(event, rows))
      })
    })
  })
}