const fs = require('fs');
const css = require('css-transition');

const TOASTY_AUDIO = fs.readFileSync('partials/audio.html');
const TOASTY_GUY = fs.readFileSync('partials/toasty-guy.html');

const SLIDE_IN_SPEED = 350;
const SLIDE_OUT_SPEED = 400;
const DELAY_UNTIL_SLIDE_OUT = 500;

module.exports = class Toasty
{
  /**
   * Set up a toasty guy bound to an element click
   * @param {string} el DOM selector
   */
  constructor(el)
  {
    this.audio = this._createAudio();
    this.toastyGuy = this._createToastyGuy();

    if (el) {
      this.element = document.querySelector(el);
      this.element.onclick = this._onClick.bind(this);
    }
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
   * Create a toasty guy image and add it to the DOM
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
    this.trigger();
    return false;
  }

  /**
   * Play the sound and handle the lifecycle of the toasty animation
   * @return {Promise}
   */
  trigger()
  {
    if (this._inProgress) {
      return new Promise((resolve, reject) => reject());
    }

    this._inProgress = true;

    this.playSound();

    return this.slideIn()
      .then(() => this._delayUntilSlideOut())
      .then(() => this.slideOut())
      .then(() => this._inProgress = false);
  }

  /**
   * Play the toasty audio file
   */
  playSound()
  {
    this.audio.play();
  }

  /**
   * Animate toasty guy into the visible viewport
   * @return {Promise}
   */
  slideIn()
  {
    this.toastyGuy.style.display = 'block';

    /**
     * Since toasty guy appears from off screen, this makes sure
     * horizontal scrollbar doesn't show up while he's poppin' in
     */
    this._origOverflowX = document.body.style.overflowX;
    document.body.style.overflowX = 'hidden';

    /**
     * Slide that piece of shit in
     */
    return new Promise(resolve => {
      css(this.toastyGuy, { right: 0 }, SLIDE_IN_SPEED, () => resolve());
    });
  }

  /**
   * Give a promise that resolves after the slide out delay
   * @return {Promise}
   * @private
   */
  _delayUntilSlideOut()
  {
    return new Promise(resolve => setTimeout(() => resolve(), DELAY_UNTIL_SLIDE_OUT));
  }

  /**
   * Slide toasty guy back and reset the body overflow-x CSS prop to its original value
   * @return {Promise}
   */
  slideOut()
  {
    return new Promise(resolve => {
      css(this.toastyGuy, { right: `-${this.toastyGuy.offsetWidth}px` }, SLIDE_OUT_SPEED, () => {
        this.toastyGuy.style.display = 'none';
        document.body.style.overflowX = this._origOverflowX;
        resolve();
      });
    });
  }

  /**
   * Remove all created DOM nodes and detach event handlers
   */
  destroy()
  {
    let tgContainer = this.toastyGuy.parentNode;
    let audioContainer = this.audio.parentNode;

    tgContainer.parentNode.removeChild(tgContainer);
    audioContainer.parentNode.removeChild(audioContainer);

    this.audio = null;
    this.toastyGuy = null;

    this.element.removeEventListener('click', this._onClick.bind(this), false);
  }
}
