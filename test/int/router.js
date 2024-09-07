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
    , INH_PROPERTIES = 27
    ;


// -- Local Variables


// -- Main
module.exports = function(Spine) {
  const R = Spine.Router({
    //
  });

  describe('Test Spine.Router:', () => {
    it('Expects Spine.Router to return a function.', () => {
      expect(Spine.Router).to.be.a('function');
    });

    it('Expects Spine.Router() to return a function.', () => {
      expect(R).to.be.a('function');
    });

    it('Expects Spine.Router()() to return an object.', () => {
      expect(R()).to.be.an('object');
    });

    describe('Check Spine.Router()() own properties:', () => {
      it('Expects Spine.Router()() to own 3 properties.', () => {
        expect(Object.getOwnPropertyNames(R())).to.be.an('array').that.has.lengthOf(OWN_PROPERTIES);
      });

      it('Expects Spine.Router()() to own the property "_trigger" that is equal to true.', () => {
        expect(R()).to.own.property('_trigger').that.is.equal(true);
      });

      it('Expects Spine.Router()() to own the property "_replace" that is equal to false.', () => {
        expect(R()).to.own.property('_replace').that.is.equal(false);
      });

      it('Expects Spine.Router()() to own the property "routes" that is an empty object.', () => {
        expect(R()).to.own.property('routes').that.is.an('object').that.is.empty;
      });

      it('Expects Spine.Router()() to own the property "_mess" that is an object.', () => {
        expect(R()).to.own.property('_mess').that.is.an('object');
      });

      it('Expects _mess to own, at least, the property "_db" that is an empty object.', () => {
        expect(R()._mess).to.own.property('_db').that.is.an('object').that.is.empty;
      });
    });

    describe('Check Spine.Router()() inherited properties:', () => {
      // [
      //   '_ginit', '_init', '$on', 'on', '$one', 'one', '$off', 'off', '$fire', 'fire',
      //   '$trigger', 'trigger', '_intInitialize', '_intListen', 'initialize', '$initialize',
      //   'listen', '$listen', '$execute', 'execute', '$navigate', 'navigate', '$getLastRoute',
      //   'getLastRoute', '$stop', 'stop', 'constructor'
      // ]

      it(`Expects Spine.Router()() to inherit ${INH_PROPERTIES} properties.`, () => {
        const io = Object.getPrototypeOf(R());
        expect(Object.getOwnPropertyNames(io)).to.be.an('array').that.has.lengthOf(INH_PROPERTIES);
      });

      it('Expects Spine.Router()() to inherit of "_ginit" that is a function.', () => {
        expect(R()).to.have.property('_ginit').that.is.a('function');
      });

      it('Expects Spine.Router()() to inherit of "_init" that is a function.', () => {
        expect(R()).to.have.property('_init').that.is.a('function');
      });

      it('Expects Spine.Router()() to inherit of "constructor" that is a function.', () => {
        expect(R().constructor).to.be.a('function');
      });

      it('Expects Spine.Router()() to inherit of "$initialize" that is a function.', () => {
        expect(R()).to.have.property('$initialize').that.is.a('function');
      });

      it('Expects Spine.Router()() to inherit of "$listen" that is a function.', () => {
        expect(R()).to.have.property('$listen').that.is.a('function');
      });

      it('Expects Spine.Router()() to inherit of "$execute" that is a function.', () => {
        expect(R()).to.have.property('$execute').that.is.a('function');
      });

      it('Expects Spine.Router()() to inherit of "$navigate" that is a function.', () => {
        expect(R()).to.have.property('$navigate').that.is.a('function');
      });

      it('Expects Spine.Router()() to inherit of "$getLastRoute" that is a function.', () => {
        expect(R()).to.have.property('$getLastRoute').that.is.a('function');
      });

      it('Expects Spine.Router()() to inherit of "$stop" that is a function.', () => {
        expect(R()).to.have.property('$stop').that.is.a('function');
      });

      it('Expects Spine.Router()() to inherit of "$on" that is a function.', () => {
        expect(R()).to.have.property('$on').that.is.a('function');
      });

      it('Expects Spine.Router()() to inherit of "$one" that is a function.', () => {
        expect(R()).to.have.property('$one').that.is.a('function');
      });

      it('Expects Spine.Router()() to inherit of "$off" that is a function.', () => {
        expect(R()).to.have.property('$off').that.is.a('function');
      });

      it('Expects Spine.Router()() to inherit of "$fire" that is a function.', () => {
        expect(R()).to.have.property('$fire').that.is.a('function');
      });

      it('Expects Spine.Router()() to inherit of "$trigger" that is a function.', () => {
        expect(R()).to.have.property('$trigger').that.is.a('function');
      });
    });

    describe('Test the Spine.router methods:', () => {
      describe('Test the method _init:', () => {
        it('Expects router._init() to return "this".', () => {
          expect(R()._init()).to.be.an('object');
        });
      });

      describe('Test the $initialize method:', () => {
        it('Expects router.$initialize() to return "this".', () => {
          expect(R().$initialize()).to.be.an('object');
        });
      });

      describe('Test the $listen method:', () => {
        it('Expects router.$listen() to return "this".', () => {
          expect(R().$listen()).to.be.an('object');
        });
      });
    });
  });
};
