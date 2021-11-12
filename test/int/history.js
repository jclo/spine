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
  describe('Test Spine.History:', () => {
    it('Expects Spine.History to return an object.', () => {
      expect(Spine.History).to.be.an('object');
    });

    describe('Check Spine.History own properties:', () => {
      it('Expects Spine.History to own 6 properties.', () => {
        expect(Object.getOwnPropertyNames(Spine.History)).to.be.an('array').that.has.lengthOf(7);
      });

      it('Expects Spine.History to own the property "_history" that is a null.', () => {
        expect(Spine.History).to.own.property('_history').that.is.equal(null);
      });

      it('Expects Spine.History to own the property "get" that is a function.', () => {
        expect(Spine.History).to.own.property('get').that.is.a('function');
      });

      it('Expects Spine.History to own the property "isHistoryRunning" that is a function.', () => {
        expect(Spine.History).to.own.property('isHistoryRunning').that.is.a('function');
      });

      it('Expects Spine.History to own the property "pop" that is a function.', () => {
        expect(Spine.History).to.own.property('pop').that.is.a('function');
      });

      it('Expects Spine.History to own the property "push" that is a function.', () => {
        expect(Spine.History).to.own.property('push').that.is.a('function');
      });

      it('Expects Spine.History to own the property "start" that is a function.', () => {
        expect(Spine.History).to.own.property('start').that.is.a('function');
      });

      it('Expects Spine.History to own the property "stop" that is a function.', () => {
        expect(Spine.History).to.own.property('stop').that.is.a('function');
      });
    });

    describe('Test Spine.History methods:', () => {
      describe('Test the method isHistoryRunning :', () => {
        it('Expects Spine.History.isHistoryRunning() to return false.', () => {
          expect(Spine.History.isHistoryRunning()).to.be.false;
        });
      });

      describe('Test the method start:', () => {
        it('Expects Spine.History.start() to return "this".', () => {
          expect(Spine.History.start()).to.be.an('object');
        });

        it('Expects Spine.History.start() converts Spine.History._history to an empty array.', () => {
          expect(Spine.History._history).to.be.an('array').that.has.lengthOf(0);
        });

        it('Expects Spine.History.isHistoryRunning() to return true.', () => {
          expect(Spine.History.isHistoryRunning()).to.be.true;
        });
      });

      describe('Test the method pop:', () => {
        it('Expects Spine.History.pop() to return undefined.', () => {
          expect(Spine.History.pop()).to.be.equal(undefined);
        });
      });

      describe('Test the method push:', () => {
        it('Expects Spine.History.push("aaa") to return "this".', () => {
          expect(Spine.History.push('aaa')).to.be.an('object');
        });

        it('Expects Spine.History._history to contains one element.', () => {
          expect(Spine.History._history).to.be.an('array').that.has.lengthOf(1);
        });

        it('Expects this element to be "aaa".', () => {
          expect(Spine.History._history[0]).to.be.a('string').that.is.equal('aaa');
        });
      });

      describe('Text the method get.', () => {
        it('Expects Spine.History.get() to return the element "aaa".', () => {
          expect(Spine.History.get()).to.be.a('string').that.is.equal('aaa');
        });
      });

      describe('Text the method pop:', () => {
        it('Expects Spine.History.pop() to returns the element "aaa".', () => {
          expect(Spine.History.pop()).to.be.a('string').that.is.equal('aaa');
        });

        it('Expects Spine.History._history to become an empty array.', () => {
          expect(Spine.History._history).to.be.an('array').that.has.lengthOf(0);
        });
      });
    });
  });
};
