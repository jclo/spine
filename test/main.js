// ESLint declarations:
/* global describe */
/* eslint one-var: 0, semi-style: 0 */


// -- Vendor Modules
const { JSDOM } = require('jsdom')
    , fetch     = require('node-fetch')
    ;


// -- Local Modules
const pack           = require('../package.json')
    , testlib        = require('./int/lib')
    , testmodel      = require('./int/model')
    , testcollection = require('./int/collection')
    , testview       = require('./int/view')
    , testrouter     = require('./int/router')
    , testradio      = require('./int/radio')
    , testhistory    = require('./int/history')
    , testintercom   = require('./int/intercom')
    ;


// -- Local Constants
const apiserver = 'http://localhost:1080'
    , libname = 'Spine'
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
global.navigator = { userAgent: 'node.js' };
global.fetch = fetch;

// Nota:
// If you want that 'display-coverage' shows the coverage files by files,
// you should set 'Spine' and 'testlib' like this:
//  . const Spine = require('../src/<file>').default;
//  . testlib(Spine, '{{lib:name}}', '{{lib:version}}', 'without new');
//
// But, if you want that 'display-coverage' shows the coverage in one file,
// you should set 'Spine' and 'testlib' like this:
//  . const Spine = require('../index');
//  . testlib(Spine, libname, pack.version, 'without new');

const Spine = require('../src/spine').default;
// const Spine = require('../index');

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
