// ESLint declarations:
/* global describe, it */
/* eslint one-var: 0, no-unused-vars: 0, semi-style: 0, no-underscore-dangle: 0
  no-unused-expressions: 0 */


// -- Vendor Modules
const should     = require('chai').should()
    , { expect } = require('chai')
    ;


// -- Local Modules
const test1 = require('./model/model_1')
    , test2 = require('./model/model_2')
    , test3 = require('./model/model_3')
    , test4 = require('./model/model_4')
    , test5 = require('./model/model_5')
    ;


// -- Local Constants


// -- Local Variables


// -- Main
module.exports = function(Spine, apiserver) {
  describe('Test Spine.Model:', () => {
    test1(Spine, apiserver);
    test2(Spine, apiserver);
    test3(Spine, apiserver);
    test4(Spine, apiserver);
    test5(Spine, apiserver);
  });
};
