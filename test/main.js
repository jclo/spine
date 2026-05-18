// ESLint declarations:
/* global describe */
/* eslint no-unused-vars: 0 */


// -- Vendor Modules
import { JSDOM } from 'jsdom';


// -- Local Modules
import pack from '../package.json' with { type: 'json' };
import testlib from './int/lib.js';
import testmodel from './int/model.js';
import testcollection from './int/collection.js';
import testview from './int/view.js';
import testrouter from './int/router.js';
import testradio from './int/radio.js';
import testhistory from './int/history.js';
import testintercom from './int/intercom.js';


// -- Local Constants
const apiserver = 'http://localhost:1080'
    , libname   = 'Spine'
    ;


// -- Local Variables


// -- Main

// This define root for Node.js:
global.root = {};

// Create a Virtual DOM:
const HTML = `
<!DOCTYPE html>
  <html>
    <head>
    </head>
    <body>
      <div id="app"></div>
    </body>
  </html>
`;

const dom = new JSDOM(HTML);
global.window = dom.window;
global.root = dom.window;
global.document = dom.window.document;
// global.navigator = { userAgent: 'node.js' };

// Nota:
// If you want that 'display-coverage' shows the coverage files by files,
// you should set 'Spine' and 'testlib' like this:
//  . const Spine = (await import('../src/spine.js')).default;
//  . testlib(Spine, '{{lib:name}}', '{{lib:version}}', 'without new');
//
// But, if you want that 'display-coverage' shows the coverage in one file,
// you should set 'Spine' and 'testlib' like this:
//  . const Spine = (await import('../index.js')).default;
//  . testlib(Spine, libname, pack.version, 'without new');

const Spine = (await import('../src/spine.js')).default;
// const Spine (await import('../index.js')).default;

describe('Test Spine:', () => {
  testlib(Spine, '{{lib:name}}', '{{lib:version}}', 'without new');
  // testlib(Spine, libname, pack.version, 'without new');

  testmodel(Spine, apiserver);
  testcollection(Spine, apiserver);
  testview(Spine);
  testrouter(Spine);

  testradio(Spine);
  testhistory(Spine);
  testintercom(Spine);
});


// - oOo --
