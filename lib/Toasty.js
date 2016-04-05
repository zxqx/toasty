const fs = require('fs');
const css = require('css-transition');

const TOASTY_AUDIO = fs.readFileSync('partials/audio.html');
const TOASTY_GUY = fs.readFileSync('partials/toasty.html');

module.exports = class Toasty
{
  /**
   * Set up a toasty guy bound to an element click
   * @param {string} el DOM selector
   */
  constructor(el)
  {
    this.element = document.querySelector(el);
    this.audio = this._createAudio();
    this.toastyGuy = this._createToastyGuy();

    this.element.onclick = this._onClick.bind(this);
  }

  /**
   * Create an audio element and add it to the DOM
   * @return {HTMLElement}
   * @private
   */
  _createAudio()
  {
    let a = document.createElement('div');
    a.innerHTML = TOASTY_AUDIO;

    document.body.appendChild(a);

    return a.firstChild;
  }

  /**
   * Create a toasty guy image with all the necessary styles and add it to the DOM
   * @return {HTMLElement}
   * @private
   */
  _createToastyGuy()
  {
    let tg = document.createElement('div');
    tg.innerHTML = TOASTY_GUY;

    document.body.appendChild(tg);

    return tg.firstChild;
  }

  /**
   * Handle click event and prevent default click action
   * @return {boolean}
   * @private
   */
  _onClick()
  {
    this.playSound();
    this.show();

    return false;
  }

  /**
   * Play the audio file
   */
  playSound()
  {
    this.audio.play();
  }

  /**
   * Animate toasty guy into the visible viewport
   */
  show()
  {
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
    css(this.toastyGuy, { right: `-${this.toastyGuy.offsetWidth}px` }, 400,
      () => document.body.style.overflowX = this.origOverflowX);
  }
}
