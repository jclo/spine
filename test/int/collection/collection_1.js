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
const OWN_PROPERTIES = 6
    , INH_PROPERTIES = 22
    ;


// -- Local Variables


// -- Main
module.exports = function(Spine) {
  const C = Spine.Collection({
    //
  });

  describe('Test Spine.Collection Constructor:', () => {
    it('Expects Spine.Collection to return a function.', () => {
      expect(Spine.Collection).to.be.a('function');
    });

    it('Expects Spine.Collection() to return a constructor function.', () => {
      expect(C).to.be.a('function');
    });

    it('Expects Spine.Collection()() to return an object.', () => {
      expect(C()).to.be.an('object');
    });
  });


  describe('Test Spine.Collection object own properties:', () => {
    const c = C();
    const op = Object.getOwnPropertyNames(c);

    // [ '_mess', '_ids', '_cids', '_models', 'url', 'model' ]
    it('Expects Spine.Collection()() to own 6 properties.', () => {
      expect(op).to.be.an('array').that.has.lengthOf(OWN_PROPERTIES);
    });

    it('Expects Spine.Collection()() to own the property "_mess" that is an object.', () => {
      expect(c).to.own.property('_mess').that.is.an('object');
    });

    it('Expects Spine.Collection()() to own the property "_ids" that is an empty array.', () => {
      expect(c).to.own.property('_ids').that.is.an('array').that.has.lengthOf(0);
    });

    it('Expects Spine.Collection()() to own the property "_cids" that is an empty array.', () => {
      expect(c).to.own.property('_cids').that.is.an('array').that.has.lengthOf(0);
    });

    it('Expects Spine.Collection()() to own the property "_models" that is an empty array.', () => {
      expect(c).to.own.property('_models').that.is.an('array').that.has.lengthOf(0);
    });

    it('Expects Spine.Collection()() to own the property "url" that is null.', () => {
      expect(c).to.own.property('url').that.is.equal(null);
    });

    it('Expects Spine.Collection()() to own the property "model" that is a model constructor.', () => {
      expect(c).to.own.property('model').that.is.a('function');
    });
  });


  describe('Test Spine.Collection object inherited properties:', () => {
    // [
    //  '_ginit', '_init', 'on', 'one', 'off', 'fire', 'trigger',
    //  'initialize', 'listen', 'get', 'each', 'next', 'previous', 'length',
    // 'empty', 'add', 'remove' 'fetch', 'save', 'delete', 'urify',
    // 'constructor'
    // ]

    const c = C();
    const ip = Object.getOwnPropertyNames((Object.getPrototypeOf(c)));
    it(`Expects Spine.Collection()() to inherit ${INH_PROPERTIES} properties.`, () => {
      expect(ip).to.be.an('array').that.has.lengthOf(INH_PROPERTIES);
    });
  });
};
