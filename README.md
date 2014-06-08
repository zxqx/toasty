# mk-toasty

Make the Mortal Kombat toasty guy pop out on your site.

![Toasty Guy](http://nhx.io/demos/toasty/images/toasty.png)

## Installation

```
$ npm install mk-toasty
```

## Build

```
$ npm run build
```

## Usage

**HTML**:
```html
<button class="toasty">Click me!</button>
```

**JS**:
```js
var Toasty = require('mk-toasty');

var toasty = new Toasty('.toasty');
toasty.add();
```

## Demo

[Toasty!](http://nhx.io/demos/toasty)
