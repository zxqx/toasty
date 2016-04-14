const expect = require('chai').expect;
const sinon = require('sinon');
const toasty = require('../index.js');
const Toasty = require('../lib/Toasty.js');

let container = document.createElement('div');
container.classList.add('toasty');

describe('basics', () => {
  before(() => {
    document.body.appendChild(container);
  });

  after(() => {
    document.body.removeChild(container);
  });

  it('should initialize toasty plugin', () => {
    let instance = toasty('.toasty');
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
    let instance = toasty('.toasty');
    instance.slideIn()
      .then(() => {
        let toastyGuy = document.querySelector('img');
        expect(toastyGuy.style.right).to.eql(0);
      });
  });

  it('should slide out toasty guy', () => {
    let instance = toasty('.toasty');
    instance.slideOut()
      .then(() => {
        let toastyGuy = document.querySelector('img');
        expect(toastyGuy.style.right).to.eql(`-${toastyGuy.offsetWidth}px`);
      });
  });

  it('should play sound when element is clicked', () => {
    let instance = toasty('.toasty');
    let el = document.querySelector('.toasty');
    let spy = sinon.spy(instance, 'playSound');
    el.click();
    sinon.assert.called(spy);
  });

  it('should slide in toasty guy when element is clicked', () => {
    let instance = toasty('.toasty');
    let el = document.querySelector('.toasty');
    let spy = sinon.spy(instance, 'slideIn');
    el.click();
    sinon.assert.called(spy);
  });

  it('should slide out toasty guy after delay', () => {
    let instance = toasty('.toasty');
    let el = document.querySelector('.toasty');
    let spy = sinon.spy(instance, 'slideOut');
    el.click();

    setTimeout(() => sinon.assert.called(spy), 2000);
  });
});
