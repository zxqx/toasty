module.exports = Toasty;

var fs = require('fs');
var css = require('css-transition');

Toasty.AUDIO = fs.readFileSync('partials/audio.html');
Toasty.TOASTY_GUY = fs.readFileSync('partials/toasty.img');

/**
 * Hold a reference to the audio, image, and trigger element
 * @constructor
 * @param {string} el DOM selector
 */
function Toasty(el)
{
  this._started = false;
  this.audio = null;
  this.toastyGuy = null;

  this.triggerElement = document.querySelector(el);
}

/**
 * Set up audio, image, and click handler
 */
Toasty.prototype.add = function()
{
  if (this._started) {
    throw new Error('Toasty guy already triggered by this element');
  }

  this._started = true;

  this.addAudio();
  this.addToastyGuy();

  this.triggerElement.onclick = this.onClick.bind(this);
};

/**
 * Create an audio element and add it to the DOM
 */
Toasty.prototype.addAudio = function()
{
  var a = this.audio = document.createElement('audio');
  a.setAttribute('preload', 'auto');
  a.innerHTML = Toasty.AUDIO;

  document.body.appendChild(a);
};

/**
 * Create a toasty guy image with all the necessary styles and add it to the DOM
 */
Toasty.prototype.addToastyGuy = function()
{
  var tg = this.toastyGuy = document.createElement('img');
  tg.src = Toasty.TOASTY_GUY;

  tg.style.position = 'absolute';
  tg.style.bottom = '0px';
  tg.style.right = '-296px';
  tg.style.width = '296px';
  tg.style.height = '287px';
  tg.style.display = 'none';

  document.body.appendChild(this.toastyGuy);
};

/**
 * Proxy click event through and prevent default click action
 */
Toasty.prototype.onClick = function()
{
  this.show();
  return false;
};

/**
 * Play the audio and animate toasty guy into the visible viewport
 */
Toasty.prototype.show = function()
{
  this.audio.play();
  this.toastyGuy.style.display = 'block';

  // Since toasty guy appears from off screen, this makes sure
  // scrollies don't show up while he's poppin' in
  this.origOverflowX = document.body.style.overflowX;
  document.body.style.overflowX = 'hidden';

  // Slide that piece of shit in
  css(this.toastyGuy, { right: 0 }, 350,
    () => setTimeout(() => this.hide(), 500));
};

/**
 * Slide toasty guy back and reset the body overflow-x CSS prop to its original value
 */
Toasty.prototype.hide = function()
{
  css(this.toastyGuy, { right: '-296px' }, 400,
    () => document.body.style.overflowX = this.origOverflowX);
};
