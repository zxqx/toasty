const css = require('css-transition');
const toastyAudio = require('./partials/audio.js');
const toastyGuy = require('./partials/toasty-guy.js');

const SLIDE_IN_SPEED = 350;
const SLIDE_OUT_SPEED = 400;
const DELAY_UNTIL_SLIDE_OUT = 500;

module.exports = class Toasty
{
  /**
   * Set up a toasty guy bound to an element click
   * @param {string} [el] selector
   */
  constructor(el)
  {
    this.audio = this._createAudio();
    this.toastyGuy = this._createToastyGuy();
    this._inProgress = false;

    if (el) {
      this.elements = Array.from(document.querySelectorAll(el));
      this.elements.forEach(element => {
        this._onClick = this._onClick.bind(this);
        element.addEventListener('click', this._onClick);
      });
    }
  }

  /**
   * Create an audio element and add it to the DOM
   * @return {HTMLElement}
   * @private
   */
  _createAudio()
  {
    var a = document.createElement('div');
    a.innerHTML = toastyAudio;

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
    var tg = document.createElement('div');
    tg.innerHTML = toastyGuy;

    document.body.appendChild(tg);

    return tg.firstChild;
  }

  /**
   * Handle click event and prevent default click action
   * @param {Event} e
   * @private
   */
  _onClick(e)
  {
    e.preventDefault();
    this.trigger();
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

    this.playAudio();

    return this.slideIn()
      .then(() => this._delayUntilSlideOut())
      .then(() => this.slideOut())
      .then(() => this._inProgress = false);
  }

  /**
   * Play the toasty audio file
   */
  playAudio()
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
     * Slide that piece of shit in
     */
    return new Promise(resolve => {
      css(this.toastyGuy, { right: 0 }, SLIDE_IN_SPEED, resolve);
    });
  }

  /**
   * Give a promise that resolves after the slide out delay
   * @return {Promise}
   * @private
   */
  _delayUntilSlideOut()
  {
    return new Promise(resolve => setTimeout(resolve, DELAY_UNTIL_SLIDE_OUT));
  }

  /**
   * Slide toasty guy back out
   * @return {Promise}
   */
  slideOut()
  {
    return new Promise(resolve => {
      css(this.toastyGuy, { right: `-${this.toastyGuy.offsetWidth}px` }, SLIDE_OUT_SPEED, () => {
        this.toastyGuy.style.display = 'none';
        resolve();
      });
    });
  }

  /**
   * Remove all created DOM nodes and detach event handlers
   */
  destroy()
  {
    if (this.toastyGuy) {
      var tgContainer = this.toastyGuy.parentNode;
      tgContainer.parentNode.removeChild(tgContainer);
      this.toastyGuy = null;
    }

    if (this.audio) {
      var audioContainer = this.audio.parentNode;
      audioContainer.parentNode.removeChild(audioContainer);
      this.audio = null;
    }

    if (this.elements) {
      this.elements.forEach(element => {
        element.removeEventListener('click', this._onClick);
      });
    }

    this._inProgress = false;
  }
}
