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
    describe('Test save method:', () => {
      const M = Spine.Model({ url: `${apiserver}/api/v1/account` });

      it('Expects m.save({ a: 2 }, (e, r) => ...) to return a success.', (done) => {
        const m = M({ a: 1, b: 2 });
        m.save({ a: 2 }, { type: 'text' }, (err, res) => {
          try {
            expect(err).to.be.a('null');
            expect(res).to.be.a('string').that.is.equal('done');
            done();
          } catch (e) {
            done(e);
          }
        });
      });

      it('Expects m.save({ a: 2 }, (e, r) => ...) to fire the "save" event.', (done) => {
        const m = M({ a: 1, b: 2 });
        m.on('save', (payload) => {
          try {
            expect(payload).to.be.a('string').that.is.equal('done');
            done();
          } catch (e) {
            done(e);
          }
        });
        m.save({ a: 2 }, { type: 'text' }, (err, res) => {});
      });

      it('Expects m.save({ a: 2 }, { silent: false }, (e, r) => ...) to fire the "save" event.', (done) => {
        const m = M({ a: 1, b: 2 });
        m.on('save', (payload) => {
          try {
            expect(payload).to.be.a('string').that.is.equal('done');
            done();
          } catch (e) {
            done(e);
          }
        });
        m.save({ a: 2 }, { silent: false, type: 'text' }, (err, res) => {});
      });

      it('Expects m.save({ a: 2 }, { silent: true }, (e, r) => ...) not to fire the "save" event.', (done) => {
        const m = M({ a: 1, b: 2 });
        m.on('save', (payload) => {
          try { expect(true).to.be.equal(false); done(); } catch (e) { done(e); }
        });
        m.save({ a: 2 }, { silent: true }, (err, res) => {});
        setTimeout(() => { done(); }, 100);
      });

      it('Expects m.save({ a: 2 }) to fire the "save" event.', (done) => {
        const m = M({ a: 1, b: 2 });
        m.on('save', (payload) => {
          try {
            expect(payload).to.be.a('string').that.is.equal('done');
            done();
          } catch (e) {
            done(e);
          }
        });
        m.save({ a: 2 }, { type: 'text' });
      });

      // Variations of arguments
      it('Expects m.save() to do nothing.', (done) => {
        const m = M({ a: 1, b: 2 });
        m.on('save', (payload) => {
          try { expect(true).to.be.equal(false); done(); } catch (e) { done(e); }
        });
        m.save();
        setTimeout(() => { done(); }, 100);
      });

      it('Expects m.save(1) to do nothing.', (done) => {
        const m = M({ a: 1, b: 2 });
        m.on('save', (payload) => {
          try { expect(true).to.be.equal(false); done(); } catch (e) { done(e); }
        });
        m.save(1);
        setTimeout(() => { done(); }, 100);
      });

      it('Expects m.save({ a: 2 }, { silent: false }) to fire the "save" event.', (done) => {
        const m = M({ a: 1, b: 2 });
        m.on('save', (payload) => {
          try {
            expect(payload).to.be.a('string').that.is.equal('done');
            done();
          } catch (e) {
            done(e);
          }
        });
        m.save({ a: 2 }, { silent: false, type: 'text' });
      });

      it('Expects m.save({ a: 2 }, []) to fire the "save" event.', (done) => {
        const m = M({ a: 1, b: 2 });
        m.on('save', (payload) => {
          try {
            expect(payload).to.be.a('string').that.is.equal('done');
            done();
          } catch (e) {
            done(e);
          }
        });
        m.save({ a: 2 }, { type: 'text' }, []);
      });

      it('Expects m.save(1, 1) to do nothing.', (done) => {
        const m = M({ a: 1, b: 2 });
        m.on('save', (payload) => {
          try { expect(true).to.be.equal(false); done(); } catch (e) { done(e); }
        });
        m.save(1, 1);
        setTimeout(() => { done(); }, 100);
      });

      it('Expects m.save({ a: 2 }, { silent: false }, []) to fire the "save" event.', (done) => {
        const m = M({ a: 1, b: 2 });
        m.on('save', (payload) => {
          try {
            expect(payload).to.be.a('string').that.is.equal('done');
            done();
          } catch (e) {
            done(e);
          }
        });
        m.save({ a: 2 }, { silent: false, type: 'text' }, []);
      });

      it('Expects m.save({ a: 2 }, (e, r) => {}, { silent: false }) to fire the "save" event.', (done) => {
        const m = M({ a: 1, b: 2 });
        m.on('save', (payload) => {
          try {
            expect(payload).to.be.a('string').that.is.equal('done');
            done();
          } catch (e) {
            done(e);
          }
        });
        m.save({ a: 2 }, { type: 'text' }, () => {
          //
        }, { silent: false });
      });

      it('Expects m.save({ a: 2 }, [], { silent: false }) to fire the "save" event.', (done) => {
        const m = M({ a: 1, b: 2 });
        m.on('save', (payload) => {
          try {
            expect(payload).to.be.a('string').that.is.equal('done');
            done();
          } catch (e) {
            done(e);
          }
        });
        m.save({ a: 2 }, { silent: false, type: 'text' }, []);
      });

      it('Expects m.save(1, 2, 3) to do nothing.', (done) => {
        const m = M({ a: 1, b: 2 });
        m.on('save', (payload) => {
          try { expect(true).to.be.equal(false); done(); } catch (e) { done(e); }
        });
        m.save(1, 2, 3);
        setTimeout(() => { done(); }, 100);
      });
    });
  });
};
