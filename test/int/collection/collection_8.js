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
module.exports = function(Spine, apiserver) {
  describe('Test Spine.Collection object methods (next):', () => {
    describe('Test $length method:', () => {
      const C = Spine.Collection({ url: '' });
      const c = C([{ id: 1, a: 1, b: 2 }, { id: 2, c: 3, d: 4 }]);

      it('Expects Spine.Collection()([{ id: 1, a: 1, b: 2 }, { id: 2, c: 3, d: 4 }]) to create a collection.', () => {
        expect(c._models).to.be.an('array');
      });

      it('Expects this collection to own 2 models.', () => {
        expect(c.$length()).to.be.a('number').that.is.equal(2);
      });
    });
  });
};
