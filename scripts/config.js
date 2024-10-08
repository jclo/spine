/** ************************************************************************
 *
 * Configuration file.
 *
 *
 *
 * @namespace    -
 * @dependencies none
 * @exports      -
 * @author       -
 * @since        0.0.0
 * @version      -
 * ********************************************************************** */
/* eslint one-var: 0, semi-style: 0 */


// -- Vendor Modules


// -- Local Modules
const pack = require('../package.json');


// -- Local Constants
const libname = 'Spine'
    , name    = libname.replace(/\s+/g, '').toLowerCase()
    , source  = './src/spine.js'
    ;


// -- Local Variables


// -- Main

module.exports = {
  ES6GLOB: '$__ES6GLOB',
  root: '.',
  dist: './_dist',
  libdir: './lib',
  libname,
  name,
  index: './index.js',
  distlink: `./_dist/lib/${name}.js`,

  // This is the entry javascript file of your library. Choose one
  // pattern among the proposed ones in src. The files 'basic.js',
  // 'functional.js', 'functional-shared.js', 'prototypal.js',
  // 'pseudoclassical.js' and pseudoclassical-auto.js' are mutually exclusives.
  source,

  webfiles: [
    // These are the files to copy to the root path of the web app,
    './README.md',
    './LICENSE.md',
  ],

  get license() {
    return ['/*! ****************************************************************************',
      ` * ${libname} v${pack.version}`,
      ' *',
      ` * ${pack.description}.`,
      ' * (you can download it from npm or github repositories)',
      ` * Copyright (c) ${(new Date()).getFullYear()} ${pack.author.name} <${pack.author.email}> (${pack.author.url}).`,
      ' * Released under the MIT license. You may obtain a copy of the License',
      ' * at: http://www.opensource.org/licenses/mit-license.php).',
      ' * Built from ES6Kadoo v2.2.1.',
      ' * ************************************************************************** */',
      ''].join('\n');
  },
};
