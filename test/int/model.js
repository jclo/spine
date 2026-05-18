// ESLint declarations:
/* global describe */
/* - */


// -- Vendor Modules


// -- Local Modules
import test1 from './model/model_1.js';
import test2 from './model/model_2.js';
import test3 from './model/model_3.js';
import test4 from './model/model_4.js';
import test5 from './model/model_5.js';


// -- Local Constants


// -- Local Variables


// -- Main
export default function(Spine, apiserver) {
  describe('Test Spine.Model:', () => {
    test1(Spine, apiserver);
    test2(Spine, apiserver);
    test3(Spine, apiserver);
    test4(Spine, apiserver);
    test5(Spine, apiserver);
  });
};
