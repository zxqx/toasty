# mk-toasty

Make the Mortal Kombat toasty guy pop out on your site.

[![Circle CI](https://circleci.com/gh/zakangelle/mk-toasty/tree/master.svg?style=shield)](https://circleci.com/gh/zakangelle/mk-toasty/tree/master)

[![See Demo](https://img.shields.io/badge/see-demo-green.svg)](https://dl.dropboxusercontent.com/u/21334841/demos/mk-toasty/index.html)

<a href="https://dl.dropboxusercontent.com/u/21334841/demos/mk-toasty/index.html">
  <img src='https://www.dropbox.com/s/h7zo1d5g57vjdv9/mk-toasty.png?raw=1' width='300px' />
</a>

## Installation

```sh
$ npm install mk-toasty
```

## Usage

Show it when a certain element is clicked:

**JS**:

```js
import toasty from 'mk-toasty';

toasty('.toasty');
```

**HTML**:

```html
<button class="toasty">Click me!</button>
```

or just directly initialize it:

```js
import toasty from 'mk-toasty';

toasty();
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

Tests are done with [karma](https://karma-runner.github.io) and [chai](http://chaijs.com/) by running:

```
$ npm test
```
