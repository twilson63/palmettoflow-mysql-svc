# Palmetto Flow MySql Service

A palmetto flow mysql service that receives sql queries and returns results

## Usage

Configuration

See https://github.com/felixge/node-mysql#establishing-connections

Service Container

``` js
var svc = require('palmettoflow-mysql-svc')
svc(config, ee)
```

Client Usage

``` js
var ne = newEvent('mysql', 'query', {
  sql: 'show tables'
})
ee.once(ne.from, function (event) {
  console.log(event)
  t.ok(true)
  t.end()
})
ee.emit('send', ne)
```

