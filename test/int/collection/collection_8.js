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
    describe('Test $length method:', () => {
      const C = Spine.Collection({ url: '' });
      const c = C([{ id: 1, a: 1, b: 2 }, { id: 2, c: 3, d: 4 }]);

      it('Expects Spine.Collection()([{ id: 1, a: 1, b: 2 }, { id: 2, c: 3, d: 4 }]) to create a collection.', () => {
        expect(c._models).to.be.an('array');
      });

      it('Expects this collection to own 2 models.', () => {
        expect(c.$length()).to.be.a('number').that.is.equal(2);
      });
    });
  });
};
