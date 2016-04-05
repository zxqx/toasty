const fs = require('fs');
const css = require('css-transition');

const TOASTY_AUDIO = fs.readFileSync('partials/audio.html');
const TOASTY_GUY = fs.readFileSync('partials/toasty.img');

module.exports = class Toasty
{
  /**
   * Set up a toasty guy bound to an element click
   * @param {string} el DOM selector
   */
  constructor(el)
  {
    this.element = document.querySelector(el);
    this.audio = this.createAudio();
    this.toastyGuy = this.createToastyGuy();

    this.element.onclick = this.onClick.bind(this);
  }

  /**
   * Create an audio element and add it to the DOM
   * @return {HTMLElement}
   */
  createAudio()
  {
    let a = document.createElement('audio');
    a.setAttribute('preload', 'auto');
    a.innerHTML = TOASTY_AUDIO;

    document.body.appendChild(a);

    return a;
  }

  /**
   * Create a toasty guy image with all the necessary styles and add it to the DOM
   * @return {HTMLElement}
   */
  createToastyGuy()
  {
    let tg = document.createElement('img');
    tg.src = TOASTY_GUY;

    tg.style.position = 'absolute';
    tg.style.bottom = '0px';
    tg.style.right = '-296px';
    tg.style.width = '296px';
    tg.style.height = '287px';
    tg.style.display = 'none';

    document.body.appendChild(tg);

    return tg;
  }

  /**
   * Proxy click event through and prevent default click action
   * @return {boolean}
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
