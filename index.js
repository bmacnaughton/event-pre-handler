'use strict'

var slice = Array.prototype.slice

function preEmit (type) {
  var list = this._eph_events[type]
  if (list) {
    var args = slice.call(arguments, 1)
    for (var i = 0; i < list.length; i++) {
      list[i].apply(this, args)
    }
  }

  return this._eph_emit.apply(this, arguments)
}

function patch (emitter) {
  if (emitter && !emitter._eph_events) {
    emitter._eph_events = {}
    emitter._eph_emit = emitter.emit
    emitter._preHandle = preHandle
    emitter.emit = preEmit
  }
  return emitter
}

function preHandle (type, handler) {
  this._eph_events[type] = this._eph_events[type] || []
  this._eph_events[type].unshift(handler)
}

module.exports = patch
