# toasty

Make the Mortal Kombat toasty guy pop out on your site.

[![Circle CI](https://circleci.com/gh/zakangelle/toasty/tree/master.svg?style=shield)](https://circleci.com/gh/zakangelle/toasty/tree/master) [![Coverage Status](https://img.shields.io/coveralls/zakangelle/toasty.svg)](https://coveralls.io/github/zakangelle/toasty?branch=master) [![See Demo](https://img.shields.io/badge/see-demo-8c568b.svg)](https://dl.dropboxusercontent.com/u/21334841/demos/toasty/index.html)

<a href="https://dl.dropboxusercontent.com/u/21334841/demos/toasty/index.html">
  <img src='https://www.dropbox.com/s/31i0wpsurd9jrir/toasty.png?raw=1' width='280px' />
</a>

## Installation

```sh
$ npm install toasty
```

## Usage

Show toasty guy when a certain element is clicked:

**JS**:

```js
import toasty from 'toasty';

toasty('.toasty');
```

**HTML**:

```html
<button class="toasty">Click me!</button>
```

or just trigger it directly:

```js
import toasty from 'toasty';

let t = toasty();
t.trigger();
```

## Example

Generate an example in `example/dist`:

```sh
$ npm run example
```

## Standalone

Generate a standalone build in `dist` (for use with `<script>` tags and AMD module loaders):

```sh
$ npm run build:standalone
```

## Test

Run tests with [karma](https://karma-runner.github.io) and [mocha](https://mochajs.org/):

```
$ npm test
```

## License

MIT
