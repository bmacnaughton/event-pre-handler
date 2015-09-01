var slice = Array.prototype.slice

function preEmit (type) {
  var list = this._uev_events[type]
  if (list) {
    var args = slice.call(arguments, 1)
    for (var i = 0; i < list.length; i++) {
      list[i].apply(this, args)
    }
  }

  return this._uev_emit.apply(this, arguments)
}

function patch (emitter) {
  if ( ! emitter._uev_events) {
    emitter._uev_events = {}
    emitter._uev_emit = emitter.emit
    emitter.unshift = unshift
    emitter.emit = preEmit
  }
}

function unshift (type, handler) {
  this._uev_events[type] = this._uev_events[type] || []
  this._uev_events[type].unshift(handler)
}

patch.unshift = function (emitter, type, handler) {
  patch(emitter)
  emitter.unshift(type, handler)
}

module.exports = patch
