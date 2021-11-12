// ESLint declarations:
/* global describe, it */
/* eslint one-var: 0, no-unused-vars: 0, semi-style: 0, no-underscore-dangle: 0
  no-unused-expressions: 0 */


// -- Vendor Modules
const should     = require('chai').should()
    , { expect } = require('chai')
    ;


// -- Local Modules


// -- Local Constants


// -- Local Variables


// -- Main
module.exports = function(Spine) {
  describe('Test Spine.Radio:', () => {
    it('Expects Spine.Radio to return an object.', () => {
      expect(Spine.Radio).to.be.an('object');
    });

    describe('Check Spine.Radio own properties:', () => {
      it('Expects Spine.Radio to own 6 properties.', () => {
        expect(Object.getOwnPropertyNames(Spine.Radio)).to.be.an('array').that.has.lengthOf(6);
      });

      it('Expects Spine.Radio to own the property "fire" that is a function.', () => {
        expect(Spine.Radio).to.own.property('fire').that.is.a('function');
      });

      it('Expects Spine.Radio to own the property "off" that is a function.', () => {
        expect(Spine.Radio).to.own.property('off').that.is.a('function');
      });

      it('Expects Spine.Radio to own the property "on" that is a function.', () => {
        expect(Spine.Radio).to.own.property('on').that.is.a('function');
      });

      it('Expects Spine.Radio to own the property "one" that is a function.', () => {
        expect(Spine.Radio).to.own.property('one').that.is.a('function');
      });

      it('Expects Spine.Radio to own the property "trigger" that is a function.', () => {
        expect(Spine.Radio).to.own.property('trigger').that.is.a('function');
      });

      it('Expects Spine.Radio to own the property "_mess" that is an object.', () => {
        expect(Spine.Radio).to.own.property('_mess').that.is.an('object');
      });

      it('Expects _mess owns, at least, the property "_db" that is an empty object.', () => {
        expect(Spine.Radio._mess).to.own.property('_db').that.is.an('object').that.is.empty;
      });
    });

    describe('Test the methods on, fire & trigger:', () => {
      it('Expects Spine.Radio.on("msg", handler) to get a message from Spine.Radio.trigger(...).', (done) => {
        Spine.Radio.on('msg', (payload) => {
          expect(payload).to.be.a('string').that.is.equal('payload');
          done();
        });
        Spine.Radio.trigger('msg', 'payload');
      });

      it('Expects Spine.Radio.one() to return "this".', () => {
        expect(Spine.Radio.one()).to.be.an('object');
      });

      it('Expects Spine.Radio.off() to return "this".', () => {
        expect(Spine.Radio.off()).to.be.an('object');
      });
    });
  });
};
