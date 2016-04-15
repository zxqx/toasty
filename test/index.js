const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const toasty = require('../index.js');
const Toasty = require('../lib/Toasty.js');

let container = document.createElement('div');
container.classList.add('toasty');
document.body.appendChild(container);
let instance = toasty('.toasty');

describe('toasty setup', () => {
  after(() => {
    document.body.removeChild(container);
  });

  it('should initialize toasty plugin', () => {
    expect(instance instanceof Toasty).to.be.true;
  });

  it('should add toasty audio', () => {
    let audio = document.querySelector('audio');
    expect(audio).to.be.an.instanceOf(HTMLElement);
  });

  it('should add toasty guy', () => {
    let toastyGuy = document.querySelector('img');
    expect(toastyGuy).to.be.an.instanceOf(HTMLElement);
  });

  it('should slide in toasty guy', () => {
    return instance.slideIn()
      .then(() => {
        let toastyGuy = document.querySelector('img');
        expect(toastyGuy.style.right).to.eql('0px');
      });
  });

  it('should slide out toasty guy', () => {
    return instance.slideOut()
      .then(() => {
        let toastyGuy = document.querySelector('img');
        expect(toastyGuy.style.right).to.not.eql('0px');
      });
  });

  it('should play sound when element is clicked', () => {
    let el = document.querySelector('.toasty');
    let spy = sinon.spy(instance, 'playSound');

    el.click();
    sinon.assert.called(spy);
  });

  it('should slide in toasty guy when element is clicked', () => {
    let el = document.querySelector('.toasty');
    let spy = sinon.spy(instance, 'slideIn');

    el.click();
    sinon.assert.called(spy);
  });

  it('should slide out toasty guy after delay', () => {
    let el = document.querySelector('.toasty');
    let spy = sinon.spy(instance, 'slideOut');

    el.click();
    setTimeout(() => sinon.assert.called(spy), 2000);
  });

  it('should restore original body overflow-x value', () => {
    let el = document.querySelector('.toasty');
    let origOverflowX = document.body.style.overflowX;
    return instance.init()
      .then(() => {
        expect(document.body.style.overflowX).to.eql(origOverflowX);
      });
  });

  it('should allow direct init', () => {
    let spy = sinon.spy(Toasty.prototype, 'init');
    toasty();
    sinon.assert.called(spy);
  });
});
