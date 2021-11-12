/** ************************************************************************
 *
 * Defines the Spine.Sync function.
 *
 * main.js is just a literal object that contains a set of functions. It
 * can't be intantiated.
 *
 * Private Functions:
 *  . none,
 *
 *
 * Public Static Methods:
 *  . fetch                       fetches data on the server,
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
/* global */
/* eslint */


// -- Vendor Modules


// -- Local Modules
import F from './fetch';


// -- Local Constants


// -- Local Variables


// -- Public Static Methods ------------------------------------------------

const Sync = {

  /**
   * Fetches data on the server.
   *
   * @method (arg1, [arg2], [arg3], [arg4])
   * @public
   * @param {String}        the server url,
   * @param {Object}        the fetch options,
   * @param {String}        the type of file (json or text),
   * @param {String}        the function to call at the completion,
   * @returns {}            -,
   * @since 0.0.0
   */
  fetch(...args) {
    F.fetch(...args);
    return this;
  },
};


// -- Export
export default Sync;

/* oOo */
