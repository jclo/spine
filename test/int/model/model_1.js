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
const OWN_PROPERTIES = 4
    , INH_PROPERTIES = 21
    ;


// -- Local Variables


// -- Main
module.exports = function(Spine) {
  const M = Spine.Model({
    //
  });

  describe('Test Spine.Model Constructor:', () => {
    it('Expects Spine.Model to return a function.', () => {
      expect(Spine.Model).to.be.a('function');
    });

    it('Expects Spine.Model() to return a constructor function.', () => {
      expect(M).to.be.a('function');
    });

    it('Expects Spine.Model()() to return an object.', () => {
      expect(M()).to.be.an('object');
    });
  });

  describe('Test Spine.Model object own properties:', () => {
    const m = M();
    const op = Object.getOwnPropertyNames(m);

    // [ '_mess', 'url', 'defaults', '_attributes' ]
    it('Expects Spine.Model()() to own 4 properties.', () => {
      expect(op).to.be.an('array').that.has.lengthOf(OWN_PROPERTIES);
    });

    it('Expects Spine.Model()() to own the property "url" that is null.', () => {
      expect(m).to.own.property('url').that.is.equal(null);
    });

    it('Expects Spine.Model()() to own the property "defaults" that is an object.', () => {
      expect(m).to.own.property('defaults').that.is.an('object');
    });

    it('Expects Spine.Model()() to own the property "_attributes" that is an object.', () => {
      expect(m).to.own.property('_attributes').that.is.an('object');
    });

    it('Expects Spine.Model()() to own the property "_mess" that is an object.', () => {
      expect(m).to.own.property('_mess').that.is.an('object');
    });

    it('Expects _mess to own, at least, the property "_db" that is an empty object.', () => {
      expect(m._mess).to.own.property('_db').that.is.an('object').that.is.empty;
    });
  });


  describe('Test Spine.Model object inherited properties:', () => {
    // [
    //  '_ginit', '_init', 'on', 'one', 'off', 'fire', 'trigger', '_parse',
    //  'initialize', 'listen', 'parse', 'get', 'getAll', 'set', 'remove',
    //  'has', 'fetch', 'save', 'delete' 'urify', 'constructor'
    // ]

    const m = M();
    const ip = Object.getOwnPropertyNames((Object.getPrototypeOf(m)));
    it('Expects Spine.Model()() to inherit 21 properties.', () => {
      expect(ip).to.be.an('array').that.has.lengthOf(INH_PROPERTIES);
    });
  });
};
