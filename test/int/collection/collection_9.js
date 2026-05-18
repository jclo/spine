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
  describe('Test Spine.Collection object methods (next):', () => {
    describe('Test $next method:', () => {
      const C = Spine.Collection({ url: '' });
      const c = C([{ id: 1, a: 1, b: 2 }, { id: 2, c: 3, d: 4 }, { id: 3, c: 3, d: 4 }]);

      it('Expects Spine.Collection()([{ id: 1, a: 1, b: 2 }, { id: 2, c: 3, d: 4 }, { id: 3, c: 3, d: 4 }]) to create a collection.', () => {
        expect(c._models).to.be.an('array');
      });

      it('Expects collection.$next("Hi!") to return a null.', () => {
        expect(c.$next('Hi!')).to.be.a('null');
      });

      it('Expects collection.$next(9999) to return a null.', () => {
        expect(c.$next(9999)).to.be.a('null');
      });

      it('Expects collection.$next(1) to return a model.', () => {
        expect(c.$next(1)).to.be.an('object');
        expect(c.$next(1)).to.own.property('_attributes');
      });

      it('Expects collection.$next(1) to return the second model in the collection.', () => {
        expect(c.$next(1).$get('id')).to.be.a('number').that.is.equal(2);
      });

      it('Expects collection.$next(3) to return the first model in the collection.', () => {
        expect(c.$next(3).$get('id')).to.be.a('number').that.is.equal(1);
      });
    });

    describe('Test $previous method:', () => {
      const C = Spine.Collection({ url: '' });
      const c = C([{ id: 1, a: 1, b: 2 }, { id: 2, c: 3, d: 4 }, { id: 3, c: 3, d: 4 }]);

      it('Expects Spine.Collection()([{ id: 1, a: 1, b: 2 }, { id: 2, c: 3, d: 4 }, { id: 3, c: 3, d: 4 }]) to create a collection.', () => {
        expect(c._models).to.be.an('array');
      });

      it('Expects collection.$previous("Hi!") to return a null.', () => {
        expect(c.$previous('Hi!')).to.be.a('null');
      });

      it('Expects collection.$previous(9999) to return a null.', () => {
        expect(c.$previous(9999)).to.be.a('null');
      });

      it('Expects collection.$previous(2) to return the first model in the collection.', () => {
        expect(c.$previous(2).$get('id')).to.be.a('number').that.is.equal(1);
      });

      it('Expects collection.$previous(1) to return the last model in the collection.', () => {
        expect(c.$previous(1).$get('id')).to.be.a('number').that.is.equal(3);
      });
    });
  });
};
