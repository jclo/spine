// ESLint declarations:
/* global describe */
/* - */


// -- Vendor Modules


// -- Local Modules
import test1 from './collection/collection_1.js';
import test2 from './collection/collection_2.js';
import test3 from './collection/collection_3.js';
import test4 from './collection/collection_4.js';
import test5 from './collection/collection_5.js';
import test6 from './collection/collection_6.js';
import test7 from './collection/collection_7.js';
import test8 from './collection/collection_8.js';
import test9 from './collection/collection_9.js';


// -- Local Constants


// -- Local Variables


// -- Main
export default function(Spine, apiserver) {
  describe('Test Spine.Collection:', () => {
    test1(Spine, apiserver);
    test2(Spine, apiserver);
    test3(Spine, apiserver);
    test4(Spine, apiserver);
    test5(Spine, apiserver);
    test6(Spine, apiserver);
    test7(Spine, apiserver);
    test8(Spine, apiserver);
    test9(Spine, apiserver);
  });
};
