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
  describe('Test Spine.Collection object methods:', () => {
    describe('Test Spine.Collection object creation:', () => {
      const C = Spine.Collection({ url: '' });
      const c = C([{ id: 1, a: 1, b: 2 }, { id: 2, c: 3, d: 4 }]);

      it('Expects Spine.Collection()([{ id: 1, a: 1, b: 2 }, { id: 2, c: 3, d: 4 }]) to create a collection.', () => {
        expect(c._models).to.be.an('array');
      });

      it('Expects this collection to own two models.', () => {
        expect(c._models).to.be.an('array').that.has.a.lengthOf(2);
        expect(c._models[0]).to.be.an('object');
        expect(c._models[0]).to.own.property('_attributes');
      });

      it('Expects the property "_cids" to contain "["c1", "c2"]".', () => {
        expect(c._cids).to.be.an('array').that.has.lengthOf(2);
        expect(c._cids[0]).to.be.a('string').that.is.equal('c1');
        expect(c._cids[1]).to.be.a('string').that.is.equal('c2');
      });

      it('Expects the property "_ids" to contain "[1, 2]".', () => {
        expect(c._ids).to.be.an('array').that.has.lengthOf(2);
        expect(c._ids[0]).to.be.a('number').that.is.equal(1);
        expect(c._ids[1]).to.be.a('number').that.is.equal(2);
      });

      it('Expects the first model to own the property "cid" that is equal to "c1".', () => {
        expect(c._models[0]).to.own.property('cid').that.is.a('string').that.is.equal('c1');
      });

      it('Expects the first model to contain the object "{ id: 1, a: 1, b: 2 }".', () => {
        const m = c._models[0]._attributes;
        expect(Object.keys(m)).to.be.an('array').that.has.lengthOf(3);
        expect(m).to.own.property('id').to.be.is.a('number').that.is.equal(1);
        expect(m).to.own.property('a').to.be.is.a('number').that.is.equal(1);
        expect(m).to.own.property('b').to.be.is.a('number').that.is.equal(2);
      });
    });


    describe('Test $get method:', () => {
      const C = Spine.Collection({ url: '' });
      const c = C([{ id: 1, a: 1, b: 2 }, { c: 3, d: 4 }]);

      it('Expects Spine.Collection()([{ id: 1, a: 1, b: 2 }, { c: 3, d: 4 }]) to create a collection.', () => {
        expect(c._models).to.be.an('array');
      });

      it('Expects c.$get("c1") to return the first model of the collection.', () => {
        const m = c.$get('c1');
        expect(m.cid).to.be.a('string').that.is.equal('c1');
        expect(Object.keys(m._attributes)).to.be.an('array').that.has.lengthOf(3);
        expect(m._attributes).to.own.property('id').to.be.is.a('number').that.is.equal(1);
        expect(m._attributes).to.own.property('a').to.be.is.a('number').that.is.equal(1);
        expect(m._attributes).to.own.property('b').to.be.is.a('number').that.is.equal(2);
      });

      it('Expects c.$get(1) to return the first model of the collection.', () => {
        const m = c.$get(1);
        expect(m.cid).to.be.a('string').that.is.equal('c1');
        expect(Object.keys(m._attributes)).to.be.an('array').that.has.lengthOf(3);
        expect(m._attributes).to.own.property('id').to.be.is.a('number').that.is.equal(1);
        expect(m._attributes).to.own.property('a').to.be.is.a('number').that.is.equal(1);
        expect(m._attributes).to.own.property('b').to.be.is.a('number').that.is.equal(2);
      });

      it('Expects c.$get(2) to return null.', () => {
        expect(c.$get(2)).to.be.a('null');
      });

      it('Expects c.$get() to return null.', () => {
        expect(c.$get()).to.be.a('null');
      });
    });
  });

  describe('Test $each method:', () => {
    const C = Spine.Collection({ url: '' });
    const c = C([{ id: 1, a: 1, b: 2 }, { id: 2, c: 3, d: 4 }]);
    const ceach = [];
    c.$each((m) => { ceach.push(m); });

    it('Expects Spine.Collection()([{ id: 1, a: 1, b: 2 }, { id: 2, c: 3, d: 4 }]) to create a collection.', () => {
      expect(c._models).to.be.an('array');
    });

    it('Expects c.$each(...) to return a model at each iteration.', () => {
      c.$each((m) => {
        expect(m).to.own.property('cid');
        expect(m).to.own.property('_attributes');
      });
    });

    it('Expects c.$each(...) to fill an array that contains all the models of the collection.', () => {
      expect(ceach).to.be.an('array').that.has.lengthOf(2);
      expect(ceach[0]).to.own.property('cid').that.is.a('string').that.is.equal('c1');
      expect(ceach[0]._attributes).to.own.property('id').that.is.a('number').that.is.equal(1);
      expect(ceach[1]).to.own.property('cid').that.is.a('string').that.is.equal('c2');
      expect(ceach[1]._attributes).to.own.property('id').that.is.a('number').that.is.equal(2);
    });
  });

  describe('Test $empty method:', () => {
    const C = Spine.Collection({ url: '' });
    const c = C([{ id: 1, a: 1, b: 2 }, { id: 2, c: 3, d: 4 }]);

    it('Expects Spine.Collection()([{ id: 1, a: 1, b: 2 }, { id: 2, c: 3, d: 4 }]) to create a collection.', () => {
      expect(c._models).to.be.an('array');
    });

    it('Expects this collection to own two models.', () => {
      expect(c._models).to.be.an('array').that.has.a.lengthOf(2);
      expect(c._models[0]).to.be.an('object');
      expect(c._models[0]).to.own.property('_attributes');
    });

    it('Expects c.$empty() to remove all the models from this collection.', () => {
      c.$empty();
      expect(c._models).to.be.an('array').that.has.a.lengthOf(0);
    });
  });
};
