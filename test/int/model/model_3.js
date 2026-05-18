// ESLint declarations:
/* global describe, it */
/* eslint no-unused-vars: 0 */


// -- Vendor Modules
import { expect } from 'chai';


// -- Local Modules


// -- Local Constants


// -- Local Variables


// -- Main
export default function(Spine, apiserver) {
  describe('Test Spine.Model object methods (next):', () => {
    describe('Test $fetch method:', () => {
      const M = Spine.Model({ url: `${apiserver}/api/v1/account` });

      let model1;
      it('Expects m.$fetch((e, r) => ...) to return a model', (done) => {
        const m = M();
        m.$fetch((err, res) => {
          model1 = res;
          try {
            expect(err).to.be.a('null');
            expect(res).to.be.an('object');
            done();
          } catch (e) {
            done(e);
          }
        });
      });

      it('Expects this model to be an object with two properties.', () => {
        expect(Object.keys(model1)).to.be.an('array').that.has.lengthOf(2);
      });
      it('Expects this model to own the property "a" that is equal to 1.', () => {
        expect(model1).to.own.property('a').that.is.a('number').that.is.equal(1);
      });
      it('Expects this model to own the property "b" that is equal to 2.', () => {
        expect(model1).to.own.property('b').that.is.a('number').that.is.equal(2);
      });

      let model2;
      it('Expects m.$fetch((e, e) => ...) to fire the "load" event that carries an object.', (done) => {
        const m = M();
        m.$on('load', (payload) => {
          try {
            model2 = payload;
            expect(payload).to.be.an('object');
            done();
          } catch (e) {
            done(e);
          }
        });
        m.$fetch((err, res) => {});
      });

      it('Expects this object to own two properties.', () => {
        expect(Object.keys(model2)).to.be.an('array').that.has.lengthOf(2);
      });
      it('Expects this model to own the property "a" that is equal to 1.', () => {
        expect(model2).to.own.property('a').that.is.a('number').that.is.equal(1);
      });
      it('Expects this model to own the property "b" that is equal to 2.', () => {
        expect(model2).to.own.property('b').that.is.a('number').that.is.equal(2);
      });

      it('Expects m.$fetch({ silent: true }, (e, e) => ...) not to fire any event.', (done) => {
        const m = M();
        m.$on('load', () => {
          expect(true).to.be.equal(false);
        });
        m.$fetch({ silent: true }, (err, res) => {});
        setTimeout(() => { done(); }, 100);
      });

      it('Expects m.$fetch() to fire the "load" event.', (done) => {
        const m = M();
        m.$on('load', () => {
          done();
        });
        m.$fetch();
      });

      it('Expects m.$fetch() with a model having an "id" to return a payload.', (done) => {
        const m = M();
        m.$on('load', (payload) => {
          try {
            expect(payload).to.be.an('object');
            done();
          } catch (e) {
            done(e);
          }
        });
        m.$set('id', 1);
        m.$fetch();
      });

      it('Expects m.$fetch({ query: { id: 1 } }) to return a payload.', (done) => {
        const m = M();
        m.$on('load', (payload) => {
          try {
            expect(payload).to.be.an('object');
            done();
          } catch (e) {
            done(e);
          }
        });
        m.$fetch({ query: { id: 1 } });
      });

      it('Expects m.$fetch(1) to do nothing.', (done) => {
        const m = M();
        m.$on('load', () => {
          expect(true).to.be.equal(true);
        });
        m.$fetch(1);
        setTimeout(() => { done(); }, 100);
      });

      it('Expects m.$fetch({}, []) to fire the "load" event.', (done) => {
        const m = M();
        m.$on('load', () => {
          done();
        });
        m.$fetch({}, []);
      });

      it('Expects m.$fetch(callback, { silent: false }) not to fire the "load" event.', (done) => {
        const m = M();
        m.$on('load', () => {
          expect(true).to.be.equal(true);
        });

        m.$fetch((err, res) => {
          //
        }, { silent: false });
        setTimeout(() => { done(); }, 100);
      });

      it('Expects m.$fetch([], {}) to do nothing.', (done) => {
        const m = M();
        m.$on('load', () => {
          expect(true).to.be.equal(true);
        });
        m.$fetch([], {});
        setTimeout(() => { done(); }, 100);
      });
    });
  });
};
