/** ************************************************************************
 *
 * Defines the Spine object.
 *
 * spine.js is just a literal object that contains a set of functions. It
 * can't be intantiated.
 *
 * Private Functions:
 *  . none,
 *
 *
 * Private Static Methods:
 *  . _setTestMode                returns internal objects for testing purpose,
 *
 *
 * Public Static Methods:
 *  . noConflict                  returns a reference to this Spine object,
 *  . whoami                      returns the library name and version,
 *  . Model                       extends the Spine.Model object,
 *  . Collection                  extends the Spine.Collection object,
 *  . View                        extends the Spine.View object,
 *  . Router                      extends the Spine.Router object,
 *  . History                     returns the History object,
 *  . Radio                       returns the Radio object,
 *  . fetch                       fetches data on the server,
 *  . urify                       extends url with query parameters,
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
/* global root */
/* eslint-disable no-underscore-dangle */


// -- Vendor Modules


// -- Local Modules
import M from './components/model/main';
import C from './components/collection/main';
import V from './components/view/main';
import R from './components/router/main';

import History from './components/history/main';
import Radio from './components/radio/main';
import Sync from './sync/main';
import U from './utils/util1';


// -- Local Constants
// Saves the previous value of the library variable, so that it can be
// restored later on, if noConflict is used.
const previousSpine = root.Spine;


// -- Local Variables


// -- Main -----------------------------------------------------------------

const Spine = {

  // Useful to retrieve the library name and version when it is
  // embedded in another library as an object:
  _library: { name: '{{lib:name}}', version: '{{lib:version}}' },


  // -- Private Static Methods ---------------------------------------------

  /**
   * Returns the internal objects for testing purpose.
   * (must not be deleted)
   *
   * @method ()
   * @private
   * @param {}              -,
   * @returns {Object}      returns a list of internal objects,
   * @since 0.0.0
   */
  _setTestMode() {
    return [];
  },


  // -- Public Static Methods ----------------------------------------------

  /**
   * Returns a reference to this Spine object.
   * (must not be deleted)
   *
   * Nota:
   * Running Spine in no conflict mode, returns the Spine variable to
   * its previous owner.
   *
   * @method ()
   * @public
   * @param {}              -,
   * @returns {Object}      returns the Spine object,
   * @since 0.0.0
   */
  noConflict() {
    /* eslint-disable-next-line no-param-reassign */
    root.Spine = previousSpine;
    return this;
  },

  /**
   * Returns the library name and version.
   * (must not be deleted)
   *
   * @method ()
   * @public
   * @param {}              -,
   * @returns {Object}      returns the library name and version,
   * @since 0.0.0
   */
  whoami() {
    return this._library;
  },

  /**
   * Returns a reference to the Spine.Model object.
   *
   * @method (arg1)
   * @public
   * @param {Object}        the optional parameters to extend the object,
   * @returns {Function}    returns the extended Spine.Model object,
   * @since 0.0.0
   */
  Model(methods) {
    return M.Model(methods);
  },

  /**
   * Returns a reference to the Spine.Collection object.
   *
   * @method (arg1)
   * @public
   * @param {Object}        the optional parameters to extend the object,
   * @returns {Function}    returns the extended Spine.Collection object,
   * @since 0.0.0
   */
  Collection(methods) {
    return C.Collection(methods);
  },

  /**
   * Returns a reference to the Spine.View object.
   *
   * @method (arg1)
   * @public
   * @param {Object}        the optional parameters to extend the object,
   * @returns {Function}    returns the extended Spine.View object,
   * @since 0.0.0
   */
  View(methods) {
    return V.View(methods);
  },

  /**
   * Returns a reference to the Spine.Router object.
   *
   * @method (arg1)
   * @public
   * @param {Object}        the optional parameters to extend the object,
   * @returns {Function}    returns the extended Spine.Router object,
   * @since 0.0.0
   */
  Router(methods) {
    return R.Router(methods);
  },

  /**
   * Fetches data on the server.
   *
   * @method (arg1, [arg2], [arg3], [arg4])
   * @public
   * @param {String}        the server url,
   * @param {Object}        the fetch options,
   * @param {String}        the type of file (json or text),
   * @param {String}        the function to call at the completion,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  fetch(...args) {
    Sync.fetch(...args);
    return this;
  },

  /**
   * Extends url with query parameters,
   *
   * @method (arg1, arg2)
   * @public
   * @param {String}        the server url,
   * @param {Object}        the query parameters,
   * @returns {String}      returns the URI or null,
   * @since 0.0.0
   */
  urify(...args) {
    return U.urify(...args);
  },

  // Returns the Spine.History and Spine.Radio objects.
  History,
  Radio,
};


// Attaches constants to Spine that provide name and version of the lib.
Spine.NAME = '{{lib:name}}';
Spine.VERSION = '{{lib:version}}';


// -- Export
export default Spine;

/* eslint-enable no-underscore-dangle */
