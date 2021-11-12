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
  describe('Test Spine.Model object methods (next):', () => {
    describe('Test delete method:', () => {
      const M = Spine.Model({ url: `${apiserver}/api/v1/account` });

      it('Expects m.delete((e, r) => ...) to return a success.', (done) => {
        const m = M({ id: 1, a: 1, b: 2 });
        m.delete({ type: 'text' }, (err, res) => {
          try {
            expect(err).to.be.a('null');
            expect(res).to.be.a('string').that.is.equal('done');
            done();
          } catch (e) {
            done(e);
          }
        });
      });

      it('Expects m.delete((e, r) => ...) to fire the "delete" event.', (done) => {
        const m = M({ id: 1, a: 1, b: 2 });
        m.on('delete', (payload) => {
          try {
            expect(payload).to.be.a('string').that.is.equal('done');
            done();
          } catch (e) {
            done(e);
          }
        });
        m.delete({ type: 'text' }, (err, res) => {});
      });

      it('Expects m.delete({ silent: true }, (e, r) => ...) not to fire the "delete" event.', (done) => {
        const m = M({ id: 1, a: 1, b: 2 });
        m.on('delete', (payload) => {
          try { expect(true).to.be.equal(false); done(); } catch (e) { done(e); }
        });
        m.delete({ silent: true }, (err, res) => {});
        setTimeout(() => { done(); }, 100);
      });

      it('Expects m.delete() to fire the "delete" event.', (done) => {
        const m = M({ id: 1, a: 1, b: 2 });
        m.on('delete', (payload) => {
          try {
            expect(payload).to.be.a('string').that.is.equal('done');
            done();
          } catch (e) {
            done(e);
          }
        });
        m.delete({ type: 'text' });
      });

      it('Expects m.delete((e, r) => { ... }) with model without "id" to return a warning message.', (done) => {
        const m = M({ a: 1, b: 2 });
        m.delete({ type: 'text' }, (err, res) => {
          try {
            expect(res).not.to.be.a('null');
            expect(res).to.be.a('string');
            expect(res).to.be.equal('This model has no id. Thus, it does not exist on the server!');
            done();
          } catch (e) {
            done(e);
          }
        });
      });

      it('Expects m.delete() with model without "id" to do nothing.', (done) => {
        const m = M({ a: 1, b: 2 });
        m.on('delete', (payload) => {
          try { expect(true).to.be.equal(false); done(); } catch (e) { done(e); }
        });
        m.delete();
        setTimeout(() => { done(); }, 100);
      });

      it('Expects m.delete((e, r) => { ... }) with model without a defined url to return a warning message.', (done) => {
        const M1 = Spine.Model();
        const m = M1({ id: 1, a: 1, b: 2 });
        m.delete((err, res) => {
          try {
            expect(res).not.to.be.a('null');
            expect(res).to.be.a('string');
            expect(res).to.be.equal('This model has no url!');
            done();
          } catch (e) {
            done(e);
          }
        });
      });

      it('Expects m.delete() without a defined url to do nothing.', (done) => {
        const M1 = Spine.Model();
        const m = M1({ id: 1, a: 1, b: 2 });
        m.on('delete', (payload) => {
          try { expect(true).to.be.equal(false); done(); } catch (e) { done(e); }
        });
        m.delete();
        setTimeout(() => { done(); }, 100);
      });
    });


    // Nota:
    // 'urify' is already tested by 'Collection'. So, here we have just to
    // check that 'urify' is attached to the model object.
    describe('Test urify method:', () => {
      const M = Spine.Model({ url: `${apiserver}/api/v1/account` });
      const m = M();

      it('Expects m.urify("http://a.com/", { name: "a a", surname: "b b"}) to return "http://a.com/?name=a%20a&surname=b%20b".', () => {
        expect(m.urify('http://a.com/', { name: 'a a', surname: 'b b' })).to.be.a('string').that.is.equal('http://a.com/?name=a%20a&surname=b%20b');
      });
    });
  });
};
