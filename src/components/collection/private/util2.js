/** ************************************************************************
 *
 * Implements a few utility primitives.
 *
 * util.js is just a literal object that contains a set of functions. It
 * can't be intantiated.
 *
 * Private Functions:
 *  . _get                        returns a model specified by a cid or an id,
 *
 *
 * Public Static Methods:
 *  . get                         returns a model specified by a cid or an id,
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
 * Decodes the deleted arguments.
 *
 * @function (arg1, [arg2], [arg3])
 * @private
 * @param {Array}           the list of ids,
 * @param {Object}          the optionale parameters,
 * @param {Function}        the function to call at the completion
 * @returns {Array}         returns an array with list, options, callback,
 * @since 0.0.0
 */
function _delArgs(...args) {
  const [arg1, arg2, arg3] = args;

  switch (args.length) {
    case 0:
      return [[], {}, null];

    case 1:
      if (_.isArray(arg1)) {
        return [arg1, {}, null];
      }
      if (_.isFunction(arg1)) {
        return [[], {}, arg1];
      }
      return [[], {}, null];

    case 2:
      if (_.isArray(arg1) && _.isLiteralObject(arg2)) {
        return [arg1, arg2, null];
      }
      if (_.isArray(arg1) && _.isFunction(arg2)) {
        return [arg1, {}, arg2];
      }
      if (_.isArray(arg1)) {
        return [arg1, {}, null];
      }
      return [[], {}, null];

    default:
      if (_.isArray(arg1) && _.isLiteralObject(arg2) && _.isFunction(arg3)) {
        return [arg1, arg2, arg3];
      }
      if (_.isArray(arg1) && _.isLiteralObject(arg2)) {
        return [arg1, arg2, null];
      }
      if (_.isArray(arg1) && _.isFunction(arg2)) {
        return [arg1, {}, arg2];
      }
      if (_.isArray(arg1) && _.isFunction(arg3)) {
        return [arg1, {}, arg3];
      }
      return [[], {}, null];
  }
}

/**
 * Returns a model specified by a cid or an id.
 *
 * @function (arg1, arg2, [arg3])
 * @private
 * @param {Object}          the collection object,
 * @param {String/Number}   the cid or id,
 * @param {Object}          the options,
 * @returns {Object}        returns the requested model or null,
 * @since 0.0.0
 */
function _get(col, id/* , options */) {
  if (!id) return null;

  for (let i = 0; i < col._models.length; i++) {
    if (col._models[i].cid === id || col._models[i]._attributes.id === id) {
      return col._models[i];
    }
  }
  return null;
}

/**
 * Deletes the requested models.
 *
 * @function (arg1, arg2, [arg3], [arg4])
 * @private
 * @param {Object}          the collection object,
 * @param {Array}           the list of ids,
 * @param {Object}          the optionale parameters,
 * @param {Function}        the function to call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function _delete(col, ...args) {
  const [list, options, callback] = _delArgs(...args)
      , { url }                   = col
      ;

  // Quick return if the list is empty:
  if (list.length === 0) {
    if (!options.silent) col.fire('delete', []);
    if (callback) callback(null, []);
    return;
  }

  // Compute the query (form must be: ids=id1,id2,...,idn)
  let query = '?ids=';
  for (let i = 0; i < list.length; i++) {
    query += i < list.length - 1 ? `${list[i]},` : `${list[i]}`;
  }

  const opts = {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  const type = options.type === 'text' ? 'text' : 'json';
  F.fetch(`${url}${query}`, opts, type, (err, data) => {
    if (err) {
      if (callback) callback(err);
      return;
    }
    const ids = [];
    if (_.isLiteralObject(data) && _.isArray(data.deleted)) {
      data.deleted.forEach((item) => {
        ids.push(item.id);
      });
    }

    const rmod = col.remove(ids, { silent: true });
    if (!options.silent) col.fire('delete', rmod);
    if (callback) callback(null, rmod);
  });
}


// -- Public Static Methods ------------------------------------------------

const Util = {

  /**
   * Returns a model specified by a cid or an id.
   *
   * @method (arg1, arg2, [arg3])
   * @public
   * @param {Object}          the collection object,
   * @param {String/Number}   the id or cid,
   * @param {Object}          the options,
   * @returns {Object}        returns the requested model,
   * @since 0.0.0
   */
  get(col, id, options) {
    return _get(col, id, options);
  },

  /**
   * Deletes the requested models.
   *
   * @method (arg1, arg2, [arg3], [arg4])
   * @public
   * @param {Object}          the collection object,
   * @param {Array}           the list of ids,
   * @param {Object}          the optionale parameters,
   * @param {Function}        the function to call at the completion,
   * @returns {Object}        returns this,
   * @since 0.0.0
   */
  delete(col, ...args) {
    _delete(col, ...args);
    return this;
  },
};


// -- Export
export default Util;

/* eslint-enable one-var, semi-style, no-underscore-dangle */
