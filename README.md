# mk-toasty

Make the Mortal Kombat toasty guy pop out on your site.

![Toasty Guy](https://www.dropbox.com/s/h7zo1d5g57vjdv9/mk-toasty.png?raw=1)

## Installation

```sh
$ npm install mk-toasty
```

## Usage

**HTML**:

```html
<button class="toasty">Click me!</button>
```

**JS**:

```js
import Toasty from 'mk-toasty';

var toasty = new Toasty('.toasty');
toasty.add();
```

## Example

Generate an example in `example/dist`:

```sh
$ npm run example
```

## Build

```sh
$ npm run build
```
