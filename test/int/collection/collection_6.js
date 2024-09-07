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
    describe('Test $delete method:', () => {
      const C = Spine.Collection({ url: `${apiserver}/api/v1/accounts` });

      describe('Test $delete method with wrong arguments:', () => {
        it('Expects c.$delete() to return an empty array.', (done) => {
          const c = C();
          c.$on('delete', (data) => {
            try {
              expect(data).to.be.an('array').that.has.lengthOf(0);
              done();
            } catch (e) {
              done(e);
            }
          });
          c.$delete();
        });

        it('Expects c.$delete(1) to return an empty array.', (done) => {
          const c = C();
          c.$on('delete', (data) => {
            try {
              expect(data).to.be.an('array').that.has.lengthOf(0);
              done();
            } catch (e) {
              done(e);
            }
          });
          c.$delete(1);
        });

        it('Expects c.$delete(1, 2) to return an empty array.', (done) => {
          const c = C();
          c.$on('delete', (data) => {
            try {
              expect(data).to.be.an('array').that.has.lengthOf(0);
              done();
            } catch (e) {
              done(e);
            }
          });
          c.$delete(1, 2);
        });

        it('Expects c.$delete(1, 2, 3) to return an empty array.', (done) => {
          const c = C();
          c.$on('delete', (data) => {
            try {
              expect(data).to.be.an('array').that.has.lengthOf(0);
              done();
            } catch (e) {
              done(e);
            }
          });
          c.$delete(1, 2, 3);
        });
      });

      describe('Test $delete method with right arguments:', () => {
        it('Expects c.$delete([1]) to delete one model.', (done) => {
          const c = C([{ id: 1, a: 1 }, { id: 2, a: 2 }, { id: 3, a: 3 }, { id: 4, a: 4 }]);
          c.$delete([1], (e, r) => {
            try {
              expect(e).to.be.a('null');
              expect(r).to.be.an('array').that.has.lengthOf(1);
              done();
            } catch (err) {
              done(err);
            }
          });
        });

        it('Expects c.$delete([1, 2]) to delete two models.', (done) => {
          const c = C([{ id: 1, a: 1 }, { id: 2, a: 2 }, { id: 3, a: 3 }, { id: 4, a: 4 }]);
          c.$delete([1, 2], (e, r) => {
            try {
              expect(e).to.be.a('null');
              expect(r).to.be.an('array').that.has.lengthOf(2);
              expect(r[0]._attributes.id).to.be.a('number').that.is.equal(1);
              expect(r[1]._attributes.id).to.be.a('number').that.is.equal(2);
              done();
            } catch (err) {
              done(err);
            }
          });
        });

        it('Expects c.$delete([1, 2, 3]) to delete three models.', (done) => {
          const c = C([{ id: 1, a: 1 }, { id: 2, a: 2 }, { id: 3, a: 3 }, { id: 4, a: 4 }]);
          c.$delete([1, 2, 3], (e, r) => {
            try {
              expect(e).to.be.a('null');
              expect(r).to.be.an('array').that.has.lengthOf(3);
              expect(r[0]._attributes.id).to.be.a('number').that.is.equal(1);
              expect(r[1]._attributes.id).to.be.a('number').that.is.equal(2);
              expect(r[2]._attributes.id).to.be.a('number').that.is.equal(3);
              done();
            } catch (err) {
              done(err);
            }
          });
        });
      });
    });
  });
};
