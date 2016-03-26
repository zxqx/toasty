var Toasty = require('./lib/Toasty.js');

module.exports = function(el) {
  new Toasty(el).add();
};
