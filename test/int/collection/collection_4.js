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
    describe('Test fetch method:', () => {
      const M = Spine.Model({ url: `${apiserver}/api/v1/account` });
      const C = Spine.Collection({
        url: `${apiserver}/api/v1/accounts`,
        model: M,
      });
      const c = C();

      let arr;
      it('Expects c.fetch((e, r) => {...}) to return a collection.', (done) => {
        c.fetch((err, res) => {
          try {
            arr = res;
            expect(err).to.be.a('null');
            expect(res).to.be.an('array');
            done();
          } catch (e) {
            done(e);
          }
        });
      });

      it('Expects c.fetch((e, r) => {...}) to return [ { id: 1, a: 1, b: 2 }, { id: 2, c: 3, ed: 4 } ].', () => {
        expect(arr).to.be.an('array').that.has.lengthOf(2);
        expect(Object.keys(arr[0]._attributes)).to.be.an('array').that.has.lengthOf(3);
        expect(arr[0]._attributes).to.own.property('id').that.is.equal(1);
        expect(arr[0]._attributes).to.own.property('a').that.is.equal(1);
        expect(arr[0]._attributes).to.own.property('b').that.is.equal(2);
        expect(Object.keys(arr[1]._attributes)).to.be.an('array').that.has.lengthOf(3);
        expect(arr[1]._attributes).to.own.property('id').that.is.equal(2);
        expect(arr[1]._attributes).to.own.property('c').that.is.equal(3);
        expect(arr[1]._attributes).to.own.property('d').that.is.equal(4);
      });

      it('Expects c.fetch((e, r) => {...}) to fill the colllection with [ { id: 1, a: 1, b: 2 }, { id: 2, c: 3, ed: 4 } ].', () => {
        expect(c._models).to.be.an('array').that.has.lengthOf(2);
        expect(Object.keys(c._models[0]._attributes)).to.be.an('array').that.has.lengthOf(3);
        expect(c._models[0]._attributes).to.own.property('id').that.is.equal(1);
        expect(c._models[0]._attributes).to.own.property('a').that.is.equal(1);
        expect(c._models[0]._attributes).to.own.property('b').that.is.equal(2);
        expect(Object.keys(c._models[1]._attributes)).to.be.an('array').that.has.lengthOf(3);
        expect(c._models[1]._attributes).to.own.property('id').that.is.equal(2);
        expect(c._models[1]._attributes).to.own.property('c').that.is.equal(3);
        expect(c._models[1]._attributes).to.own.property('d').that.is.equal(4);
      });

      it('Expects c.fetch() to fill the colllection with [ { id: 1, a: 1, b: 2 }, { id: 2, c: 3, ed: 4 } ].', () => {
        expect(c._models).to.be.an('array').that.has.lengthOf(2);
        expect(Object.keys(c._models[0]._attributes)).to.be.an('array').that.has.lengthOf(3);
        expect(c._models[0]._attributes).to.own.property('id').that.is.equal(1);
        expect(c._models[0]._attributes).to.own.property('a').that.is.equal(1);
        expect(c._models[0]._attributes).to.own.property('b').that.is.equal(2);
        expect(Object.keys(c._models[1]._attributes)).to.be.an('array').that.has.lengthOf(3);
        expect(c._models[1]._attributes).to.own.property('id').that.is.equal(2);
        expect(c._models[1]._attributes).to.own.property('c').that.is.equal(3);
        expect(c._models[1]._attributes).to.own.property('d').that.is.equal(4);
      });

      it('Expects c.fetch((e, r) => {...}) to fire the load event that carries the loaded collection.', (done) => {
        const c1 = C();
        c1.on('load', (payload) => {
          try {
            expect(payload).to.be.an('array').that.has.lengthOf(2);
            expect(Object.keys(payload[0]._attributes)).to.be.an('array').that.has.lengthOf(3);
            expect(payload[0]._attributes).to.own.property('id').that.is.equal(1);
            expect(payload[0]._attributes).to.own.property('a').that.is.equal(1);
            expect(payload[0]._attributes).to.own.property('b').that.is.equal(2);
            expect(Object.keys(payload[1]._attributes)).to.be.an('array').that.has.lengthOf(3);
            expect(payload[1]._attributes).to.own.property('id').that.is.equal(2);
            expect(payload[1]._attributes).to.own.property('c').that.is.equal(3);
            expect(payload[1]._attributes).to.own.property('d').that.is.equal(4);
            done();
          } catch (e) {
            done();
          }
        });
        c1.fetch((err, res) => {});
      });

      it('Expects c.fetch() to fire the load event that carries the loaded collection.', (done) => {
        const c1 = C();
        c1.on('load', (payload) => {
          try {
            expect(payload).to.be.an('array').that.has.lengthOf(2);
            expect(Object.keys(payload[0]._attributes)).to.be.an('array').that.has.lengthOf(3);
            expect(payload[0]._attributes).to.own.property('id').that.is.equal(1);
            expect(payload[0]._attributes).to.own.property('a').that.is.equal(1);
            expect(payload[0]._attributes).to.own.property('b').that.is.equal(2);
            expect(Object.keys(payload[1]._attributes)).to.be.an('array').that.has.lengthOf(3);
            expect(payload[1]._attributes).to.own.property('id').that.is.equal(2);
            expect(payload[1]._attributes).to.own.property('c').that.is.equal(3);
            expect(payload[1]._attributes).to.own.property('d').that.is.equal(4);
            done();
          } catch (e) {
            done();
          }
        });
        c1.fetch();
      });

      it('Expects c.fetch(1) to fire the load event that carries the loaded collection.', (done) => {
        const c1 = C();
        c1.on('load', (payload) => {
          try {
            expect(payload).to.be.an('array').that.has.lengthOf(2);
            expect(Object.keys(payload[0]._attributes)).to.be.an('array').that.has.lengthOf(3);
            expect(payload[0]._attributes).to.own.property('id').that.is.equal(1);
            expect(payload[0]._attributes).to.own.property('a').that.is.equal(1);
            expect(payload[0]._attributes).to.own.property('b').that.is.equal(2);
            expect(Object.keys(payload[1]._attributes)).to.be.an('array').that.has.lengthOf(3);
            expect(payload[1]._attributes).to.own.property('id').that.is.equal(2);
            expect(payload[1]._attributes).to.own.property('c').that.is.equal(3);
            expect(payload[1]._attributes).to.own.property('d').that.is.equal(4);
            done();
          } catch (e) {
            done();
          }
        });
        c1.fetch(1);
      });

      it('Expects c.fetch((e, r) => {...}, { silent: true }) to fire the load event that carries the loaded collection.', (done) => {
        const c1 = C();
        c1.on('load', (payload) => {
          try {
            expect(payload).to.be.an('array').that.has.lengthOf(2);
            expect(Object.keys(payload[0]._attributes)).to.be.an('array').that.has.lengthOf(3);
            expect(payload[0]._attributes).to.own.property('id').that.is.equal(1);
            expect(payload[0]._attributes).to.own.property('a').that.is.equal(1);
            expect(payload[0]._attributes).to.own.property('b').that.is.equal(2);
            expect(Object.keys(payload[1]._attributes)).to.be.an('array').that.has.lengthOf(3);
            expect(payload[1]._attributes).to.own.property('id').that.is.equal(2);
            expect(payload[1]._attributes).to.own.property('c').that.is.equal(3);
            expect(payload[1]._attributes).to.own.property('d').that.is.equal(4);
            done();
          } catch (e) {
            done();
          }
        });
        c1.fetch((e, r) => {}, { silent: true });
      });

      it('Expects c.fetch([], {}) to fire the load event that carries the loaded collection.', (done) => {
        const c1 = C();
        c1.on('load', (payload) => {
          try {
            expect(payload).to.be.an('array').that.has.lengthOf(2);
            expect(Object.keys(payload[0]._attributes)).to.be.an('array').that.has.lengthOf(3);
            expect(payload[0]._attributes).to.own.property('id').that.is.equal(1);
            expect(payload[0]._attributes).to.own.property('a').that.is.equal(1);
            expect(payload[0]._attributes).to.own.property('b').that.is.equal(2);
            expect(Object.keys(payload[1]._attributes)).to.be.an('array').that.has.lengthOf(3);
            expect(payload[1]._attributes).to.own.property('id').that.is.equal(2);
            expect(payload[1]._attributes).to.own.property('c').that.is.equal(3);
            expect(payload[1]._attributes).to.own.property('d').that.is.equal(4);
            done();
          } catch (e) {
            done();
          }
        });
        c1.fetch([], {});
      });

      it('Expects c.fetch({ silent: true }, (e, r) => {...}) not to fire the "load" event.', (done) => {
        const c1 = C();
        c1.on('load', (payload) => {
          try { expect(true).to.be.equal(false); done(); } catch (e) { done(e); }
        });
        c1.fetch({ silent: true }, (err, res) => {});
        setTimeout(() => { done(); }, 100);
      });

      it('Expects c.fetch({ silent: true }) not to fire the "load" event.', (done) => {
        const c1 = C();
        c1.on('load', (payload) => {
          try { expect(true).to.be.equal(false); done(); } catch (e) { done(e); }
        });
        c1.fetch({ silent: true });
        setTimeout(() => { done(); }, 100);
      });

      it('Expects c.fetch({ silent: true }, 1) not to fire the "load" event.', (done) => {
        const c1 = C();
        c1.on('load', (payload) => {
          try { expect(true).to.be.equal(false); done(); } catch (e) { done(e); }
        });
        c1.fetch({ silent: true }, 1);
        setTimeout(() => { done(); }, 100);
      });
    });
  });
};
