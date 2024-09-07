// ESLint declarations:
/* global describe, it */
/* eslint one-var: 0, no-unused-vars: 0, semi-style: 0 */


// -- Vendor Modules
const should     = require('chai').should()
    , { expect } = require('chai')
    ;


// -- Local Modules


// -- Local Constants


// -- Local Variables


// -- Main
module.exports = function(Spine) {
  const M = Spine.Model({});
  const m = M();

  describe('Test intercommunication for a Spine.Model component:', () => {
    it('Expects model.$fire("bbb", () => { ... }) to send a message.', () => {
      m.$fire('bbb', (payload) => {
        expect(m.$fire('aaa', 'payload')).to.be.an('object');
      });
    });

    it('Expects model.$one("aaa", () => { ... }) to get a message.', (done) => {
      m.$one('aaa', (payload) => {
        expect(payload).to.be.a('string').that.is.equal('payload');
        done();
      });
      m.$trigger('aaa', 'payload');
    });

    it('Expects model.$on("aaa", () => { ... }) to get a message.', (done) => {
      m.$on('aaa', (payload) => {
        expect(payload).to.be.a('string').that.is.equal('payload');
        done();
      });
      m.$fire('aaa', 'payload');
    });

    it('Expects model.$off("aaa", () => { ... }) to return "this".', () => {
      expect(m.$off()).to.be.an('object');
    });
  });
};
