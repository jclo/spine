// ESLint declarations:
/* global describe, it */
/* eslint one-var: 0, semi-style: 0, no-underscore-dangle: 0 */


// -- Vendor Modules
const { expect } = require('chai')
    ;


// -- Local Modules


// -- Local Constants
// Number of properties added by your library.
const OWNPROPS = 8
    , TESTMODE = 0
    ;


// -- Local Variables


// -- Main
module.exports = function(Spine, libname, version) {
  describe('Spine introspection:', () => {
    describe('Test the nature of Spine:', () => {
      it('Expects Spine to be an object.', () => {
        expect(Spine).to.be.an('object');
      });

      it(`Expects Spine to own ${6 + OWNPROPS} properties.`, () => {
        expect(Object.keys(Spine)).to.be.an('array').that.has.lengthOf(6 + OWNPROPS);
      });
    });


    // -- This section must not be modified --
    // NAME, VERSION, _library, _setTestMode, noConflict, whoami
    describe('Check the owned generic properties:', () => {
      it(`Expects Spine to own the property "NAME" whose value is "${libname}".`, () => {
        expect(Spine).to.own.property('NAME').that.is.equal(libname);
      });

      it(`Expects Spine to own the property "VERSION" whose value is "${version}".`, () => {
        expect(Spine).to.own.property('VERSION');
      });

      it('Expects Spine to own the property "_library" that is an object.', () => {
        expect(Spine).to.own.property('_library').that.is.an('object');
      });

      it('Expects Spine to own the property "_setTestMode" that is a function.', () => {
        expect(Spine).to.own.property('_setTestMode').that.is.a('function');
      });

      it('Expects Spine to own the property "noConflict" that is a function.', () => {
        expect(Spine).to.own.property('noConflict').that.is.a('function');
      });

      it('Expects Spine to own the property "whoami" that is a function.', () => {
        expect(Spine).to.own.property('whoami').that.is.a('function');
      });

      describe('Test the owned generic properties:', () => {
        it('Expects the property "_library" to own two properties.', () => {
          expect(Object.keys(Spine._library)).to.be.an('array').that.has.lengthOf(2);
        });
        it(`Expects the property "_library" to own the property "name" whose value is "${libname}".`, () => {
          expect(Spine._library).to.own.property('name').that.is.equal(libname);
        });
        it(`Expects the property "_library" to own the property "version" whose value is "${version}".`, () => {
          expect(Spine._library).to.own.property('version').that.is.equal(version);
        });

        it(`Expects the property "_setTestMode" to return an array with ${TESTMODE} item(s).`, () => {
          expect(Spine._setTestMode()).to.be.an('array').that.has.lengthOf(TESTMODE);
        });

        it('Expects the property "noConflict" to return an object.', () => {
          expect(Spine.noConflict()).to.be.an('object');
        });

        it('Expects the property "whoami" to return an object.', () => {
          expect(Spine.whoami()).to.be.an('object');
        });
        it('Expects this object to own two properties.', () => {
          expect(Object.keys(Spine.whoami())).to.be.an('array').that.has.lengthOf(2);
        });
        it(`Expects this object to own the property "name" whose value is "${libname}".`, () => {
          expect(Spine.whoami()).to.own.property('name').that.is.equal(libname);
        });
        it(`Expects this object to own the property "version" whose value is "${version}".`, () => {
          expect(Spine.whoami()).to.own.property('version').that.is.equal(version);
        });
      });
    });


    // -- This section must be adapted --
    // Replace here 'getString' and 'getArray' by the inherited properties
    // added by your library.
    describe('Check the owned specific properties:', () => {
      it('Expects Spine to own the property "Model" that is a function.', () => {
        expect(Spine).to.own.property('Model').that.is.a('function');
      });

      it('Expects Spine to own the property "Collection" that is a function.', () => {
        expect(Spine).to.own.property('Collection').that.is.a('function');
      });

      it('Expects Spine to own the property "View" that is a function.', () => {
        expect(Spine).to.own.property('View').that.is.a('function');
      });

      it('Expects Spine to own the property "Router" that is a function.', () => {
        expect(Spine).to.own.property('Router').that.is.a('function');
      });

      it('Expects Spine to own the property "History" that is an object.', () => {
        expect(Spine).to.own.property('History').that.is.an('object');
      });

      it('Expects Spine to own the property "Radio" that is an object.', () => {
        expect(Spine).to.own.property('Radio').that.is.an('object');
      });

      it('Expects Spine to own the property "fetch" that is a function.', () => {
        expect(Spine).to.own.property('fetch').that.is.a('function');
      });

      it('Expects Spine to own the property "urify" that is a function.', () => {
        expect(Spine).to.own.property('urify').that.is.a('function');
      });

      describe('Test the owned specific properties:', () => {
        it('Expects the property ... to be done!".', () => {
          expect(true).to.be.equal(true);
        });
      });
    });
  });
};
