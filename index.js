module.exports = Toasty;

var fs  = require('fs');
var css = require('css-transition');

Toasty.AUDIO      = fs.readFileSync(__dirname + '/partials/audio.html');
Toasty.TOASTY_GUY = fs.readFileSync(__dirname + '/partials/toasty.img');

function Toasty(el)
{
  this._started  = false;
  this.audio     = null;
  this.toastyGuy = null;

  this.triggerElement = document.querySelector(el);
}

Toasty.prototype.add = function()
{
  if (this._started)
    throw new Error('Toasty guy already triggered by this element');

  this._started = true;

  this.addAudio();
  this.addToastyGuy();

  this.triggerElement.onclick = this.onClick.bind(this);
};

Toasty.prototype.addAudio = function()
{
  this.audio = document.createElement('audio');
  this.audio.setAttribute('preload', 'auto');
  this.audio.innerHTML = Toasty.AUDIO;

  document.body.appendChild(this.audio);
};

Toasty.prototype.addToastyGuy = function()
{
  var tg = this.toastyGuy = document.createElement('img');
  tg.src = Toasty.TOASTY_GUY;

  tg.style.position = 'absolute';
  tg.style.bottom   = '0px';
  tg.style.right    = '-296px';
  tg.style.width    = '296px';
  tg.style.height   = '287px';
  tg.style.display  = 'none';

  document.body.appendChild(this.toastyGuy);
};

Toasty.prototype.onClick = function()
{
  this.show();
  return false;
};

Toasty.prototype.show = function()
{
  this.audio.play();
  this.toastyGuy.style.display = 'block';
  
  // Since toasty guy appears from off screen, this makes sure
  // scrollies don't show up while he's poppin' in
  this.origOverflowX = document.body.style.overflowX;
  document.body.style.overflowX = 'hidden';

  // Slide that piece of shit in
  var self = this;
  css(this.toastyGuy, { right: 0 }, 350,
  function() {
    setTimeout(function() {
      self.hide();
    }, 500);
  });
};

Toasty.prototype.hide = function()
{
  var self = this;
  css(this.toastyGuy, { right: '-296px' }, 400,
  function() {
    document.body.style.overflowX = self.origOverflowX; 
  });
};
