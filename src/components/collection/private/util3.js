/** ************************************************************************
 *
 * Implements a few utility primitives.
 *
 * util.js is just a literal object that contains a set of functions. It
 * can't be intantiated.
 *
 * Private Functions:
 *  . _getSaveArgs                decodes the save arguments,
 *  . _save                       adds or updates a set of models on the server,
 *
 *
 * Public Static Methods:
 *  . save                        adds or updates a set of models on the server,
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
/* eslint-disable one-var, semi-style, no-underscore-dangle */


// -- Vendor Modules


// -- Local Modules
import _ from '../../../libs/_';
import F from '../../../sync/main';


// -- Local Constants


// -- Local Variables


// -- Private Functions ----------------------------------------------------

/**
 * Decodes the save arguments.
 *
 * @function (arg1, arg2, [arg3], [arg4])
 * @private
 * @param {String}          the where clause,
 * @param {Object}          the parameters,
 * @param {Object}          the fetch options,
 * @param {Function}        the function to call at the completion
 * @returns {Array}         returns an array with where, params, options, callback,
 * @since 0.0.0
 */
function _getSaveArgs(...args) {
  const [arg1, arg2, arg3, arg4] = args;

  switch (args.length) {
    case 0:
      return [null, null, {}, null];

    case 1:
      return [null, null, {}, null];

    case 2:
      if (_.isString(arg1) && _.isLiteralObject(arg2)) {
        return [arg1, arg2, {}, null];
      }
      return [null, null, {}, null];

    case 3:
      if (_.isString(arg1) && _.isLiteralObject(arg2) && _.isLiteralObject(arg3)) {
        return [arg1, arg2, arg3, null];
      }
      if (_.isString(arg1) && _.isLiteralObject(arg2) && _.isFunction(arg3)) {
        return [arg1, arg2, {}, arg3];
      }
      return [arg1, arg2, {}, null];

    default:
      if (_.isString(arg1)
          && _.isLiteralObject(arg2)
          && _.isLiteralObject(arg3)
          && _.isFunction(arg4)) {
        return [arg1, arg2, arg3, arg4];
      }
      if (_.isString(arg1) && _.isLiteralObject(arg2)) {
        return [arg1, arg2, {}, null];
      }
      return [null, null, {}, null];
  }
}

/**
 * Adds or updates a set of models on the server.
 *
 * @function (arg1, arg2, arg3, arg4, [arg5], [arg6])
 * @private
 * @param {Object}          the collection object,
 * @param {String}          the server url/api,
 * @param {String}          the where clause,
 * @param {Object}          the params to update,
 * @param {Object}          the options,
 * @param {Function}        the function to call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function _save(col, url, ...args) {
  const [where, params, options, callback] = _getSaveArgs(...args);

  const opts = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ where, params }),
  };

  const type = options.type === 'text' ? 'text' : 'json';
  F.fetch(url, opts, type, (err, data) => {
    if (err) {
      if (callback) callback(err);
      return;
    }

    // Update collection
    if (_.isArray(data)) {
      let m;
      let keys;
      // Update the models that exist in the collection:
      for (let i = 0; i < data.length; i++) {
        if (data[i].id) {
          m = col.get(data[i].id);
          if (m) {
            keys = Object.keys(data[i]);
            for (let j = 0; j < keys.length; j++) {
              if (keys[j] !== 'id') {
                m.set(keys[j], data[i][keys[j]]);
              }
            }
          }
        }
      }
      if (!options.silent) col.fire('save', data);
      if (callback) callback(null, data);
      return;
    }
    if (!options.silent) col.fire('save', []);
    if (callback) callback(null, []);
  });
}


// -- Public Static Methods ------------------------------------------------

const Util = {

  /**
   * Adds or updates a set of models on the server.
   *
   * @method (arg1, arg2, arg3, arg4, [arg5], [arg6])
   * @public
   * @param {Object}          the collection object,
   * @param {String}          the server url/api,
   * @param {String}          the where clause,
   * @param {Object}          the params to update,
   * @param {Object}          the options,
   * @param {Function}        the function to call at the completion,
   * @returns {Object}        returns this,
   * @since 0.0.0
   */
  save(col, url, ...args) {
    _save(col, url, ...args);
    return this;
  },
};


// -- Export
export default Util;

/* eslint-enable one-var, semi-style, no-underscore-dangle */
