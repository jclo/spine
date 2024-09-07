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
  describe('Test Spine.Model object methods:', () => {
    describe('Test Spine.Model object creation:', () => {
      const M = Spine.Model({ url: '' });
      const m = M({ a: 1, b: 2 });

      it('Expects Spine.Model()({ a: 1, b: 2 }) to create a model.', () => {
        expect(m._attributes).to.be.an('object');
      });

      it('Expects this object to own two properties.', () => {
        expect(Object.getOwnPropertyNames(m._attributes)).to.be.an('array').that.has.lengthOf(2);
      });

      it('Expects this object to own the property "a".', () => {
        expect(m._attributes).to.own.property('a').that.is.equal(1);
      });

      it('Expects this object to own the property "b".', () => {
        expect(m._attributes).to.own.property('b').that.is.equal(2);
      });
    });

    describe('Test Spine.Model object creation with defaults {...}:', () => {
      const M = Spine.Model({
        url: '',
        defaults: {
          x: 4,
          z: 'zzz',
        },
      });
      const m = M({ a: 1, b: 2, x: 3 });

      it('Expects Spine.Model()({ a: 1, b: 2, x: 3 }) to create a model.', () => {
        expect(m._attributes).to.be.an('object');
      });

      it('Expects this object to own four properties.', () => {
        expect(Object.getOwnPropertyNames(m._attributes)).to.be.an('array').that.has.lengthOf(4);
      });

      it('Expects this object to own the property "a".', () => {
        expect(m._attributes).to.own.property('a').that.is.equal(1);
      });

      it('Expects this object to own the property "b".', () => {
        expect(m._attributes).to.own.property('b').that.is.equal(2);
      });

      it('Expects this object to own the property "x".', () => {
        expect(m._attributes).to.own.property('x').that.is.equal(3);
      });

      it('Expects this object to own the property "z" added by defaults.', () => {
        expect(m._attributes).to.own.property('z').that.is.equal('zzz');
      });
    });

    describe('Test Spine.Model object creation with parse method:', () => {
      const M = Spine.Model({
        url: '',
        $parse(obj) {
          /* eslint-disable-next-line */
          obj.z = 'zzz';
          return obj;
        },
      });
      const m = M({ a: 1, b: 2 }, { parse: true });

      it('Expects Spine.Model()({ a: 1, b: 2 }, { parse: true }) to create a model.', () => {
        expect(m._attributes).to.be.an('object');
      });

      it('Expects this object to own three properties.', () => {
        expect(Object.getOwnPropertyNames(m._attributes)).to.be.an('array').that.has.lengthOf(3);
      });

      it('Expects this object to own the property "a".', () => {
        expect(m._attributes).to.own.property('a').that.is.equal(1);
      });

      it('Expects this object to own the property "b".', () => {
        expect(m._attributes).to.own.property('b').that.is.equal(2);
      });

      it('Expects this object to own the property "z" added by the parse method.', () => {
        expect(m._attributes).to.own.property('z').that.is.equal('zzz');
      });
    });

    describe('Test $get method:', () => {
      const M = Spine.Model({ url: '' });
      const m = M({ a: 1, b: 2 }, { parse: true });

      it('Expects m.$get("a") to return the value "1".', () => {
        expect(m.$get('a')).to.be.a('number').that.is.equal(1);
      });

      it('Expects m.$get("c") to return "undefined".', () => {
        expect(m.$get('c')).to.be.a('undefined');
      });

      it('Expects m.$get("1") to return "null".', () => {
        expect(m.$get(1)).to.be.a('null');
      });
    });

    describe('Test $getAll method:', () => {
      const M = Spine.Model({ url: '' });
      const m = M({ a: 1, b: 2 }, { parse: true });
      const mc = m.$getAll();

      it('Expects m.$getAll() to return an object.', () => {
        expect(mc).to.be.an('object');
      });

      it('Expects this object to own two properties.', () => {
        expect(Object.getOwnPropertyNames(mc)).to.be.an('array').that.has.lengthOf(2);
      });

      it('Expects this object to own the property "a" that is equal to 1.', () => {
        expect(mc).to.own.property('a').that.is.equal(1);
      });

      it('Expects this object to own the property "b" that is equal to 2.', () => {
        expect(mc).to.own.property('b').that.is.equal(2);
      });
    });

    describe('Test $set method:', () => {
      const M = Spine.Model({ url: '' });
      const m1 = M();

      it('Expects m1.$set({ a: 1 }) to add "{ a: 1 }" to the model.', () => {
        m1.$set({ a: 1 });
        expect(m1._attributes).to.be.an('object');
      });

      it('Expects this object to own one property.', () => {
        expect(Object.getOwnPropertyNames(m1._attributes)).to.be.an('array').that.has.lengthOf(1);
      });

      it('Expects this object to own the property "a".', () => {
        expect(m1._attributes).to.own.property('a').that.is.equal(1);
      });

      it('Expects m1.$set({ b: 2 }) to add "{ b: 2 }" to the model.', () => {
        m1.$set({ b: 2 });
        expect(m1._attributes).to.be.an('object');
      });

      it('Expects this object to own one property.', () => {
        expect(Object.getOwnPropertyNames(m1._attributes)).to.be.an('array').that.has.lengthOf(2);
      });

      it('Expects this object to own the property "a".', () => {
        expect(m1._attributes).to.own.property('a').that.is.equal(1);
      });

      it('Expects this object to own the property "b".', () => {
        expect(m1._attributes).to.own.property('b').that.is.equal(2);
      });

      it('Expects m.$set({ a: 1 }) to generate the event "change".', (done) => {
        const m = M();

        m.$on('change', (payload) => {
          try {
            expect(payload).to.be.an('object');
            expect(Object.getOwnPropertyNames(payload)).to.be.an('array').that.has.lengthOf(1);
            expect(payload).to.own.property('a').that.is.equal(1);
            done();
          } catch (e) {
            done(e);
          }
        });
        m.$set({ a: 1 });
      });

      it('Expects m.$set({ title: "TITLE" }) to generate the event "change:title".', (done) => {
        const m = M();
        m.$on('change:title', (payload) => {
          try {
            expect(payload).to.be.a('string').that.is.equal('TITLE');
            done();
          } catch (e) {
            done(e);
          }
        });
        m.$set({ title: 'TITLE' });
      });

      it('Expects m.$set({ a: 1 }, { silent: true }) not to generate any event.', (done) => {
        const m = M();
        m.$on('change:a', (payload) => {
          expect(true).to.be.equal(false);
        });
        m.$on('change', (payload) => {
          expect(true).to.be.equal(false);
        });
        m.$set({ a: 1 }, { silent: true });
        setTimeout(() => { done(); }, 100);
      });

      it('Expects m.$set({ a: 1 }) sets twice to generate one change event only.', (done) => {
        const m = M({ id: 1, a: 1 });
        m.$on('change:a', (payload) => {
          expect(true).to.be.equal(false);
        });
        m.$on('change', (payload) => {
          expect(true).to.be.equal(false);
        });
        m.$set({ a: 1 });
        setTimeout(() => { done(); }, 100);
      });

      // Test a variation of arguments:
      it('Expects m.$set() to do nothing.', (done) => {
        const m = M({ a: 1, b: 2 });
        m.$on('change', () => {
          expect(true).to.be.equal(false);
        });
        m.$set();
        setTimeout(() => { done(); }, 100);
      });

      it('Expects m.$set(1) to do nothing.', (done) => {
        const m = M();
        m.$on('change', () => {
          expect(true).to.be.equal(false);
        });
        m.$set(1);
        setTimeout(() => { done(); }, 100);
      });

      it('Expects m.$set("a", 1) to add the attribute "a" and to generate an event.', (done) => {
        const m = M();
        m.$on('change', () => {
          try {
            expect(m._attributes.a).to.be.a('number').that.is.equal(1);
            done();
          } catch (e) {
            done(e);
          }
        });
        m.$set('a', 1);
      });

      it('Expects m.$set(1, 1) to to do nothing.', (done) => {
        const m = M();
        m.$on('change', () => {
          expect(true).to.be.equal(false);
        });
        m.$set(1, 1);
        setTimeout(() => { done(); }, 100);
      });

      it('Expects m.$set("a", 1, { silent: true }) to add the attribute "a" and not to generate an event.', (done) => {
        const m = M();
        m.$on('change', () => {
          expect(true).to.be.equal(false);
        });
        m.$set('a', 1, { silent: true });
        setTimeout(() => {
          try {
            expect(m._attributes.a).to.be.a('number').that.is.equal(1);
            done();
          } catch (e) {
            done(e);
          }
        }, 100);
      });

      it('Expects m.$set("a", 1, []) to add the attribute "a" and to generate an event.', (done) => {
        const m = M();
        m.$on('change', () => {
          try {
            expect(m._attributes.a).to.be.a('number').that.is.equal(1);
            done();
          } catch (e) {
            done(e);
          }
        });
        m.$set('a', 1, []);
      });

      it('Expects m.$set(1, 1, { silent: false }) to to do nothing.', (done) => {
        const m = M();
        m.$on('change', () => {
          expect(true).to.be.equal(false);
        });
        m.$set(1, 1, { silent: false });
        setTimeout(() => { done(); }, 100);
      });
    });


    describe('Test $has method:', () => {
      const M = Spine.Model({ url: '' });
      const m = M({ a: 1, b: 2 });

      it('Expects m.$has("a") to return true.', () => {
        expect(m.$has('a')).to.be.equal(true);
      });
      it('Expects m.$has("zzzzz") to return false.', () => {
        expect(m.$has('zzzzz')).to.be.equal(false);
      });
    });
  });
};
