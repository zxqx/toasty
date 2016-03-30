var fs = require('fs');
var css = require('css-transition');

const TOASTY_AUDIO = fs.readFileSync('partials/audio.html');
const TOASTY_GUY = fs.readFileSync('partials/toasty.img');

module.exports = class Toasty
{
  /**
   * Hold a reference to the audio, image, and trigger element
   * @param {string} el DOM selector
   */
  constructor(el)
  {
    this._started = false;
    this.audio = null;
    this.toastyGuy = null;

    this.triggerElement = document.querySelector(el);
  }

  /**
   * Set up audio, image, and click handler
   */
  add()
  {
    if (this._started) {
      throw new Error('Toasty guy already triggered by this element');
    }

    this._started = true;

    this.addAudio();
    this.addToastyGuy();

    this.triggerElement.onclick = this.onClick.bind(this);
  }

  /**
   * Create an audio element and add it to the DOM
   */
  addAudio()
  {
    var a = this.audio = document.createElement('audio');
    a.setAttribute('preload', 'auto');
    a.innerHTML = TOASTY_AUDIO;

    document.body.appendChild(a);
  }

  /**
   * Create a toasty guy image with all the necessary styles and add it to the DOM
   */
  addToastyGuy()
  {
    var tg = this.toastyGuy = document.createElement('img');
    tg.src = TOASTY_GUY;

    tg.style.position = 'absolute';
    tg.style.bottom = '0px';
    tg.style.right = '-296px';
    tg.style.width = '296px';
    tg.style.height = '287px';
    tg.style.display = 'none';

    document.body.appendChild(this.toastyGuy);
  }

  /**
   * Proxy click event through and prevent default click action
   */
  onClick()
  {
    this.show();
    return false;
  }

  /**
   * Play the audio and animate toasty guy into the visible viewport
   */
  show()
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
  }

  /**
   * Slide toasty guy back and reset the body overflow-x CSS prop to its original value
   */
  hide()
  {
    css(this.toastyGuy, { right: '-296px' }, 400,
      () => document.body.style.overflowX = this.origOverflowX);
  }
}
