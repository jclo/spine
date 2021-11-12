// ESLint declarations:
/* global describe, it */
/* eslint one-var: 0, no-unused-vars: 0, semi-style: 0, no-underscore-dangle: 0
  no-unused-expressions: 0 */


// -- Vendor Modules
const should     = require('chai').should()
    , { expect } = require('chai')
    ;


// -- Local Modules
const test1 = require('./collection/collection_1')
    , test2 = require('./collection/collection_2')
    , test3 = require('./collection/collection_3')
    , test4 = require('./collection/collection_4')
    , test5 = require('./collection/collection_5')
    , test6 = require('./collection/collection_6')
    , test7 = require('./collection/collection_7')
    ;


// -- Local Constants


// -- Local Variables


// -- Main
module.exports = function(Spine, apiserver) {
  describe('Test Spine.Collection:', () => {
    test1(Spine, apiserver);
    test2(Spine, apiserver);
    test3(Spine, apiserver);
    test4(Spine, apiserver);
    test5(Spine, apiserver);
    test6(Spine, apiserver);
    test7(Spine, apiserver);
  });
};
