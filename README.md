# event-pre-handle

Add priority event listeners before existing listeners.

### Install

```sh
npm install event-pre-handle
```

### Usage

```js
var patch = require('event-pre-handle')

patch(emitter)
emitter._preHandle('error', function (error) {
  // Listen to errors before other listeners handle them, and don't
  // change default behavior of crashing when there's no real listeners.
})
```
