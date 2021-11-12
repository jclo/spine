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
const OWNPROPS = 1
    , INPROPS  = 11
    ;


// -- Local Variables


// -- Main
module.exports = function(Spine) {
  const V = Spine.View({
    //
  });

  describe('Test Spine.View:', () => {
    it('Expects Spine.View to return a function.', () => {
      expect(Spine.View).to.be.a('function');
    });

    it('Expects Spine.View() to return a function.', () => {
      expect(V).to.be.a('function');
    });

    it('Expects Spine.View()() to return an object.', () => {
      expect(V()).to.be.an('object');
    });

    describe('Check Spine.View()() own properties:', () => {
      it('Expects Spine.View()() to own 4 properties.', () => {
        expect(Object.getOwnPropertyNames(V())).to.be.an('array').that.has.lengthOf(OWNPROPS);
      });

      it('Expects Spine.View()() to own the property "_mess" that is an object.', () => {
        expect(V()).to.own.property('_mess').that.is.an('object');
      });

      it('Expects _mess to own, at least, the property "_db" that is an empty object.', () => {
        expect(V()._mess).to.own.property('_db').that.is.an('object').that.is.empty;
      });
    });

    describe('Check Spine.View()() inherited properties:', () => {
      it('Expects Spine.View()() to inherit 11 properties.', () => {
        const io = Object.getPrototypeOf(V());
        expect(Object.getOwnPropertyNames(io)).to.be.an('array').that.has.lengthOf(INPROPS);
      });

      it('Expects Spine.View()() to inherit of "_ginit" that is a function.', () => {
        expect(V()._ginit).to.be.a('function');
      });

      it('Expects Spine.View()() to inherit of "_init" that is a function.', () => {
        expect(V()._init).to.be.a('function');
      });

      it('Expects Spine.View()() to inherit of "constructor" that is a function.', () => {
        expect(V().constructor).to.be.a('function');
      });

      it('Expects Spine.View()() to inherit of "initialize" that is a function.', () => {
        expect(V().initialize).to.be.a('function');
      });

      it('Expects Spine.View()() to inherit of "listen" that is a function.', () => {
        expect(V().listen).to.be.a('function');
      });

      it('Expects Spine.View()() to inherit of "render" that is a function.', () => {
        expect(V().render).to.be.a('function');
      });


      it('Expects Spine.View()() to inherit of "off" that is a function.', () => {
        expect(V().off).to.be.a('function');
      });

      it('Expects Spine.View()() to inherit of "on" that is a function.', () => {
        expect(V().on).to.be.a('function');
      });

      it('Expects Spine.View()() to inherit of "one" that is a function.', () => {
        expect(V().one).to.be.a('function');
      });

      it('Expects Spine.View()() to inherit of "fire" that is a function.', () => {
        expect(V().fire).to.be.a('function');
      });

      it('Expects Spine.View()() to inherit of "trigger" that is a function.', () => {
        expect(V().trigger).to.be.a('function');
      });
    });

    describe('Test the Spine.View methods:', () => {
      const View = Spine.View();
      const view = View();

      describe('Test the method initialize:', () => {
        it('Expects view.initialize() to return "this".', () => {
          expect(view.initialize()).to.be.an('object');
        });
      });

      describe('Test the method render:', () => {
        it('Expects view.render() to return "this".', () => {
          expect(view.render()).to.be.an('object');
        });
      });
    });
  });
};
