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
    describe('Test save method:', () => {
      const Col = Spine.Collection({ url: `${apiserver}/api/v1/accounts` });


      it('Expects col.save([{ ... }], (e, r) => ...) to return a success.', (done) => {
        const col = Col([{ id: 1, a: 1, b: 2 }, { id: 2, a: 1, b: 2 }]);

        col.save('id = 1', { column1: 'aaa' }, (err, res) => {
          try {
            expect(err).to.be.a('null');
            expect(res).to.be.an('array').that.has.lengthOf(2);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
    });
  });
};

// -- oOo ---
