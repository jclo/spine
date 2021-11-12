/** ************************************************************************
 *
 * Implements a few shared utility primitives.
 *
 * util1.js is just a literal object that contains a set of functions. It
 * can't be intantiated.
 *
 * Private Functions:
 *  . _getUriArgs                 decodes the arguments,
 *  . _getQuery                   extracts url query,
 *  . _getPArams                  extracts url params,
 *  . _getUrl                     returns the url with queries,
 *  . _urify                      extends url with query parameters,
 *
 *
 * Public Static Methods:
 *  . getUrl                      returns the url with queries,
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
/* global */
/* eslint-disable one-var, semi-style, no-underscore-dangle, no-restricted-syntax */


// -- Vendor Modules


// -- Local Modules
import _ from '../libs/_';


// -- Local Constants


// -- Local Variables


// -- Private Functions ----------------------------------------------------

/**
 * Decodes the arguments.
 *
 * @function (arg1, [arg2])
 * @private
 * @param {String}          the url,
 * @param {Object}          the query parameters,
 * @returns {Array}         returns an array with the url and the query,
 * @since 0.0.0
 */
function _getUriArgs(...args) {
  const [arg1, arg2] = args;

  switch (args.length) {
    case 0:
      return [null, {}];

    case 1:
      if (_.isString(arg1)) {
        return [arg1, {}];
      }
      return [null, {}];

    default:
      if (_.isString(arg1) && _.isLiteralObject(arg2)) {
        return [arg1, arg2];
      }
      if (_.isString(arg1)) {
        return [arg1, {}];
      }
      return [null, {}];
  }
}

/**
 * Extracts url query.
 *
 * query must be an object containing the query to perform. For instance
 * '{ offset: 1, numbers: 3 }' is transformed to the string
 * '?offset=1&numbers=3'
 *
 * @function (arg1)
 * @private
 * @param {Object}          the query,
 * @returns {String}        returns the url query,
 * @since 0.0.0
 */
function _getQuery(query) {
  if (!_.isLiteralObject(query)) return '';

  let s = '?';
  for (const item in query) {
    if ({}.hasOwnProperty.call(query, item) && query[item]) {
      s += `${item}=${query[item]}&`;
    }
  }
  s = encodeURI(s.slice(0, -1));
  return s;
}

/**
 * Extracts url params.
 *
 * params must be an object containing the url params. For instance
 * '{ _params: '/:offset/:numbers', offset: 1, numbers: 100 }' is
 * transformed to the string '/1/100'.
 *
 *
 * @function (arg1)
 * @private
 * @param {Object}          the query,
 * @returns {String}        returns the url query,
 * @since 0.0.0
 */
function _getParams(params) {
  if (!_.isLiteralObject(params)) return '';

  let s = params._params;
  for (const item in params) {
    if (item !== '_params') {
      s = s.replace(`:${item}`, params[item]);
    }
  }
  return encodeURI(s);
}

/**
 * Returns the url with queries.
 *
 * @function (arg1, arg2)
 * @private
 * @param {String}          the server url,
 * @param {Object}          the fetch options,
 * @returns {String}        returns the extended url,
 * @since 0.0.0
 */
function _getUrl(url, options) {
  if (options && (options.params || options.query)) {
    return options.params
      ? `${url}${_getParams(options.params)}`
      : `${url}${_getQuery(options.query)}`;
  }
  return url;
}

/**
 * Extends url with query parameters,
 *
 * @function (arg1, arg2)
 * @private
 * @param {String}        the server url,
 * @param {Object}        the query parameters,
 * @returns {String}      returns the URI or null,
 * @since 0.0.0
 */
function _urify(...args) {
  const [url, options] = _getUriArgs(...args);
  if (!url) return null;
  return _getUrl(url, { query: options });
}


// -- Public Static Methods ------------------------------------------------

const Util = {

  /**
   * Returns the url with queries.
   *
   * @method (arg1, arg2)
   * @public
   * @param {String}        the server url,
   * @param {Object}        the fetch options,
   * @returns {String}      returns the extended url,
   * @since 0.0.0
   */
  getUrl(url, options) {
    return _getUrl(url, options);
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
    return _urify(...args);
  },
};


// -- Export
export default Util;

/* eslint-enable one-var, semi-style, no-underscore-dangle, no-restricted-syntax */
