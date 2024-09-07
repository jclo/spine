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
  describe('Test Spine.Collection object methods (next):', () => {
    describe('Test $urify method:', () => {
      const C = Spine.Collection({ url: `${apiserver}/api/v1/accounts` });

      describe('Test $urify method with wrong arguments:', () => {
        it('Expects c.$urify() to return a null.', () => {
          const c = C();
          expect(c.$urify()).to.be.a('null');
        });

        it('Expects c.$urify(1) to return a null.', () => {
          const c = C();
          expect(c.$urify(1)).to.be.a('null');
        });

        it('Expects c.$urify(1, 2) to return a null.', () => {
          const c = C();
          expect(c.$urify(1, 2)).to.be.a('null');
        });
      });

      describe('Test $urify method with right arguments:', () => {
        it('Expects c.$urify("http://a.com") to return "http://a.com".', () => {
          const c = C();
          expect(c.$urify('http://a.com')).to.be.a('string').that.is.equal('http://a.com');
        });

        it('Expects c.$urify("http://a.com", { name: "aaa"}) to return "http://a.com?name=aaa".', () => {
          const c = C();
          expect(c.$urify('http://a.com', { name: 'aaa' })).to.be.a('string').that.is.equal('http://a.com?name=aaa');
        });

        it('Expects c.$urify("http://a.com", { name: "aaa", surname: "bbb"}) to return "http://a.com?name=aaa&surname=bbb".', () => {
          const c = C();
          expect(c.$urify('http://a.com', { name: 'aaa', surname: 'bbb' })).to.be.a('string').that.is.equal('http://a.com?name=aaa&surname=bbb');
        });

        it('Expects c.$urify("http://a.com/", { name: "aaa", surname: "bbb"}) to return "http://a.com/?name=aaa&surname=bbb".', () => {
          const c = C();
          expect(c.$urify('http://a.com/', { name: 'aaa', surname: 'bbb' })).to.be.a('string').that.is.equal('http://a.com/?name=aaa&surname=bbb');
        });

        it('Expects c.$urify("http://a.com/", { name: "a a", surname: "b b"}) to return "http://a.com/?name=a%20a&surname=b%20b".', () => {
          const c = C();
          expect(c.$urify('http://a.com/', { name: 'a a', surname: 'b b' })).to.be.a('string').that.is.equal('http://a.com/?name=a%20a&surname=b%20b');
        });

        it('Expects c.$urify("http://a.com/", { name: "a", surname: null }) to return "http://a.com/?name=a".', () => {
          const c = C();
          expect(c.$urify('http://a.com/', { name: 'a', surname: null })).to.be.a('string').that.is.equal('http://a.com/?name=a');
        });
      });
    });
  });
};
