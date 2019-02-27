var Emitter = require('events').EventEmitter
var assert = require('assert')
var patch = require('./')

function test (done) {
  var ev = new Emitter
  var count = 0
  const rev = patch(ev)
  assert(rev === ev)

  const x = patch(null)
  assert(x === null)

  ev.on('test', function () {
    assert(count === 2)
    assert(ev.listeners('test').length === 1)
    if (done) done()
  })

  ev._preHandle('test', function () {
    assert(count === 1)
    count++
  })

  ev._preHandle('test', function () {
    count++
  })

  ev.emit('test')
}

function bench (done) {
  var start = Date.now()
  for (var i = 0; i < 1000000; i++) {
    test()
  }
  var end = Date.now()
  if (done) done(start, end)
}

var isBench = !!~process.argv.indexOf('--bench')
if (isBench) {
  bench(function (start, end) {
    console.log('benchmarks took', end - start, 'ms')
  })
} else {
  test(function () {
    console.log('tests passed')
  })
}
