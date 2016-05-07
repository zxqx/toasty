const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const expect = chai.expect;
const sinon = require('sinon');
const toasty = require('../index.js');
const Toasty = require('../lib/Toasty.js');

chai.use(chaiAsPromised);

let container;
let instance;

describe('toasty setup', () => {
  beforeEach(() => {
    container = document.createElement('div');
    container.classList.add('toasty');
    document.body.appendChild(container);
    instance = toasty('.toasty');
  });

  afterEach(() => {
    document.body.removeChild(container);
    instance.destroy();
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
        expect(toastyGuy.style.display).to.eql('block');
      });
  });

  it('should slide out toasty guy', () => {
    return instance.slideIn()
      .then(() => instance.slideOut())
      .then(() => {
        let toastyGuy = document.querySelector('img');
        expect(toastyGuy.style.display).to.eql('none');
      });
  });

  it('should play audio when element is clicked', () => {
    let el = document.querySelector('.toasty');
    let spy = sinon.spy(instance, 'playAudio');

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

    return instance.trigger().then(() => sinon.assert.called(spy));
  });

  it('should short circuit trigger if in progress', () => {
    instance.trigger();
    return expect(instance.trigger()).to.eventually.be.rejected;
  });

  it('should allow boot without element', () => {
    let t = toasty();
    expect(t.element).to.be.undefined;
  });

  it('should destroy instance', () => {
    instance.destroy();

    expect(instance.toastyGuy).to.be.null;
    expect(instance.audio).to.be.null;
  });

  it('should allow for multiple trigger elements', () => {
    let container2 = document.createElement('div');
    container2.classList.add('toasty');
    let container3 = document.createElement('div');
    container3.classList.add('toasty');
    let container4 = document.createElement('div');
    container4.classList.add('toasty');

    document.body.appendChild(container2);
    document.body.appendChild(container3);
    document.body.appendChild(container4);

    instance = toasty('.toasty');

    let el = Array.from(document.querySelectorAll('.toasty'))[2];
    let spy = sinon.spy(instance, 'slideIn');

    el.click();
    sinon.assert.called(spy);

    document.body.removeChild(container2);
    document.body.removeChild(container3);
    document.body.removeChild(container4);

    instance.destroy();
  });

  it('should allow for multiple destroys', () => {
    instance.destroy();
    expect(instance.destroy.bind(instance)).to.not.throw(Error);
  });
});
