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
  describe('Test Spine.Collection object methods (next):', () => {
    describe('Test add method:', () => {
      const C = Spine.Collection({ url: '' });
      const c = C();

      let cout;
      it('Expects c.add({ a: 1, b: 2 }) to add a new model to the collection.', () => {
        cout = c.add({ a: 1, b: 2 });
        expect(c._models).to.be.an('array').that.has.lengthOf(1);
      });

      it('Expects the added model to own the property "cid" that is equal to "c1".', () => {
        expect(c._models[0]).to.be.an('object');
        expect(c._models[0]).to.own.property('cid').that.is.equal('c1');
      });

      it('Expects c.add({ a: 1, b: 2 }) to return an array containing the added model.', () => {
        expect(cout).to.be.an('array').that.has.lengthOf(1);
        expect(cout[0]).to.be.an('object');
        expect(cout[0]).to.own.property('cid').that.is.equal('c1');
      });

      it('Expects c.add({ a: 1, b: 2 }) to fire the "add" event that carries the added model.', (done) => {
        const c1 = C();
        c1.on('add', (payload) => {
          try {
            expect(payload).to.be.an('object');
            expect(payload).to.own.property('cid').that.is.equal('c1');
            done();
          } catch (e) {
            done(e);
          }
        });
        c1.add({ a: 1, b: 2 });
      });

      it('Expects c.add([{ a: 1 }, { b: 2 }]) to fire the "addcomplete" event that carries the added models.', (done) => {
        const c1 = C();
        c1.on('addcomplete', (payload) => {
          try {
            expect(payload).to.be.an('array').that.has.lengthOf(2);
            expect(payload[0]).to.own.property('cid').that.is.equal('c1');
            expect(payload[1]).to.own.property('cid').that.is.equal('c2');
            done();
          } catch (e) {
            done(e);
          }
        });
        c1.add([{ a: 1 }, { b: 2 }]);
      });

      it('Expects c.add([{ a: 1 }, { b: 2 }]) to fire two "add" and one "addcomplete" events.', (done) => {
        const c1 = C();
        let eadd = 0;
        let ecomp = 0;
        c1.on('add', (payload) => { eadd += 1; });
        c1.on('addcomplete', (payload) => { ecomp += 1; });
        setTimeout(() => {
          try {
            expect(eadd).to.be.equal(2);
            expect(ecomp).to.be.equal(1);
            done();
          } catch (e) {
            done(e);
          }
        }, 200);
        c1.add([{ a: 1 }, { b: 2 }]);
      });

      it('Expects c.add({ a: 1 }, { silent: true }) not to fire the "add" and "addcomplete" events.', (done) => {
        const c1 = C();
        c1.on('add', (payload) => {
          try { expect(true).to.be.equal(false); done(); } catch (e) { done(e); }
        });
        c1.on('addcomplete', (payload) => {
          try { expect(true).to.be.equal(false); done(); } catch (e) { done(e); }
        });
        c1.add({ a: 1 }, { silent: true });
        setTimeout(() => { done(); }, 100);
      });
    });

    describe('Test add method (as update):', () => {
      const C = Spine.Collection({ url: '' });
      const c = C();

      it('Expects c.add({ id: 1, a: 1, b: 2 }) to add a new model to the collection.', () => {
        c.add({ id: 1, a: 1, b: 2 });
        expect(c._models).to.be.an('array').that.has.lengthOf(1);
      });

      it('Expects the added model to own the property "cid" that is equal to "c1".', () => {
        expect(c._models[0]).to.be.an('object');
        expect(c._models[0]).to.own.property('cid').that.is.equal('c1');
      });

      it('Expects the added model to own the properties id = 1, a = 1, b = 2.', () => {
        expect(c._models[0]._attributes).to.be.an('object');
        expect(Object.getOwnPropertyNames(c._models[0]._attributes)).to.be.an('array').that.has.lengthOf(3);
        expect(c._models[0]._attributes).to.own.property('id').that.is.equal(1);
        expect(c._models[0]._attributes).to.own.property('a').that.is.equal(1);
        expect(c._models[0]._attributes).to.own.property('b').that.is.equal(2);
      });

      it('Expects c.add({ id: 1, b: 3, c: 4 }) NOT to add a new model to the collection.', () => {
        c.add({ id: 1, b: 3, c: 4 });
        expect(c._models).to.be.an('array').that.has.lengthOf(1);
      });

      it('Expects the updated model to own the properties id = 1, a = 1, b = 3, c = 4.', () => {
        expect(c._models[0]._attributes).to.be.an('object');
        expect(Object.getOwnPropertyNames(c._models[0]._attributes)).to.be.an('array').that.has.lengthOf(4);
        expect(c._models[0]._attributes).to.own.property('id').that.is.equal(1);
        expect(c._models[0]._attributes).to.own.property('a').that.is.equal(1);
        expect(c._models[0]._attributes).to.own.property('b').that.is.equal(3);
        expect(c._models[0]._attributes).to.own.property('c').that.is.equal(4);
      });
    });


    describe('Test remove method:', () => {
      const C = Spine.Collection({ url: '' });

      it('Expects C([{ id: 1, a: 1, b: 2 }, { id: 2 c: 3, d: 4}]) to create a collection with two models.', () => {
        const c = C([{ id: 1, a: 1, b: 2 }, { id: 2, c: 3, d: 4 }]);
        expect(c._models).to.be.an('array').that.has.lengthOf(2);
      });

      it('Expects c.remove("c1") to remove the first model of the collection.', () => {
        const c = C([{ id: 1, a: 1, b: 2 }, { id: 2, c: 3, d: 4 }]);
        c.remove('c1');
        expect(c._models).to.be.an('array').that.has.lengthOf(1);
        expect(c.get('c1')).to.be.a('null');
      });

      it('Expects c.remove("c1") to return the removed model.', () => {
        const c = C([{ id: 1, a: 1, b: 2 }, { id: 2, c: 3, d: 4 }]);
        const m = c.remove('c1');
        expect(m).to.be.an('array').that.has.lengthOf(1);
        expect(m[0]._attributes.id).to.be.a('number').that.is.equal(1);
      });

      it('Expects c.remove(2) to remove the second model of the collection.', () => {
        const c = C([{ id: 1, a: 1, b: 2 }, { id: 2, c: 3, d: 4 }]);
        c.remove(2);
        expect(c._models).to.be.an('array').that.has.lengthOf(1);
        expect(c.get('c2')).to.be.a('null');
      });

      it('Expects c.remove(["c1", 2, 3]) to remove the whole collection.', () => {
        const c = C([{ id: 1, a: 1, b: 2 }, { id: 2, c: 3, d: 4 }]);
        c.remove(['c1', 2, 3]);
        expect(c._models).to.be.an('array').that.has.lengthOf(0);
      });

      it('Expects c.remove(c.get("c1")) to remove the first model of the collection.', () => {
        const c = C([{ id: 1, a: 1, b: 2 }, { id: 2, c: 3, d: 4 }]);
        c.remove(c.get('c1'));
        expect(c._models).to.be.an('array').that.has.lengthOf(1);
        expect(c.get('c1')).to.be.a('null');
      });

      it('Expects c.remove(null) to remove nothing.', () => {
        const c = C([{ id: 1, a: 1, b: 2 }, { id: 2, c: 3, d: 4 }]);
        c.remove(null);
        expect(c._models).to.be.an('array').that.has.lengthOf(2);
      });

      it('Expects c.remove([null, null]) to remove nothing.', () => {
        const c = C([{ id: 1, a: 1, b: 2 }, { id: 2, c: 3, d: 4 }]);
        c.remove([null, null]);
        expect(c._models).to.be.an('array').that.has.lengthOf(2);
      });

      it('Expects c.remove("c1") to fire the "remove" event that carries the removed model.', (done) => {
        const c = C([{ id: 1, a: 1, b: 2 }, { id: 2, c: 3, d: 4 }]);
        c.on('remove', (payload) => {
          try {
            expect(payload).to.be.an('object');
            expect(payload).to.own.property('cid').that.is.equal('c1');
            done();
          } catch (e) {
            done(e);
          }
        });
        c.remove('c1');
      });

      it('Expects c.remove("c1") to fire the "removecomplete" event that carries the removed model.', (done) => {
        const c = C([{ id: 1, a: 1, b: 2 }, { id: 2, c: 3, d: 4 }]);
        c.on('removecomplete', (payload) => {
          try {
            expect(payload).to.be.an('array');
            expect(payload[0]).to.own.property('cid').that.is.equal('c1');
            done();
          } catch (e) {
            done(e);
          }
        });
        c.remove('c1');
      });

      it('Expects c.remove(["c1", "c2"]) to fire two "remove" and one "removecomplete" events.', (done) => {
        const c = C([{ id: 1, a: 1, b: 2 }, { id: 2, c: 3, d: 4 }]);
        let erm = 0;
        let eup = 0;
        c.on('remove', (payload) => { erm += 1; });
        c.on('removecomplete', (payload) => { eup += 1; });
        setTimeout(() => {
          try {
            expect(erm).to.be.equal(2);
            expect(eup).to.be.equal(1);
            done();
          } catch (e) {
            done(e);
          }
        }, 200);
        c.remove(['c1', 'c2']);
      });

      it('Expects c.remove("c1", { silent: true }) not to fire any events.', (done) => {
        const c = C([{ id: 1, a: 1, b: 2 }, { id: 2, c: 3, d: 4 }]);
        c.on('add', (payload) => {
          try { expect(true).to.be.equal(false); done(); } catch (e) { done(e); }
        });
        c.on('removecomplete', (payload) => {
          try { expect(true).to.be.equal(false); done(); } catch (e) { done(e); }
        });
        c.remove('c1', { silent: true });
        setTimeout(() => { done(); }, 100);
      });

      it('Expects c.remove(["c1", "c2"], { silent: true }) not to fire any events.', (done) => {
        const c = C([{ id: 1, a: 1, b: 2 }, { id: 2, c: 3, d: 4 }]);
        c.on('add', (payload) => {
          try { expect(true).to.be.equal(false); done(); } catch (e) { done(e); }
        });
        c.on('removecomplete', (payload) => {
          try { expect(true).to.be.equal(false); done(); } catch (e) { done(e); }
        });
        c.remove(['c1', 'c2'], { silent: true });
        setTimeout(() => { done(); }, 100);
      });
    });
  });
};
