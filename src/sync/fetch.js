/** ************************************************************************
 *
 * Retrieves data from the server.
 * (this file is just a copy and paste of the file './src/private/fetch.js'
 * extracted from PicoQ v1.0.1 with one exception: fetch does not return
 * a promise)
 *
 * fetch.js is just a literal object that contains a set of functions.
 * It can't be instantiated.
 *
 * Private Functions:
 *  . _getArgs                    returns the named fetch arguments,
 *  . _fetch                      fetches data on the server,
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
/* eslint-disable one-var, semi-style, no-underscore-dangle */


// -- Vendor Modules


// -- Local Modules


// -- Local Constants


// -- Local Variables


// -- Private functions ----------------------------------------------------

/**
 * Returns the named fetch arguments.
 *
 * @function (...args)
 * @private
 * @param {...}             the optional arguments [url, options, type, callback],
 * @returns {}              -,
 * @since 0.0.0
 */
function _getArgs(...args) /* istanbul ignore next */{
  const [arg1, arg2, arg3, arg4] = args;

  switch (args.length) {
    case 0:
      return [null, null, null, null];

    case 1:
      if (typeof arg1 === 'string') {
        return [arg1, {}, null, null];
      }
      return [null, null, null, null];

    case 2:
      if (typeof arg1 === 'string') {
        if (typeof arg2 === 'object' && arg2.method) {
          return [arg1, arg2, null, null];
        }
        if (typeof arg2 === 'string') {
          return [arg1, {}, arg2, null];
        }
        if (typeof arg2 === 'function') {
          return [arg1, {}, null, arg2];
        }
        return [arg1, {}, null, null];
      }
      return [null, null, null, null];

    case 3:
      if (typeof arg1 === 'string') {
        if (typeof arg2 === 'object' && arg2.method) {
          if (typeof arg3 === 'string') {
            return [arg1, arg2, arg3, null];
          }
          if (typeof arg3 === 'function') {
            return [arg1, arg2, null, arg3];
          }
          return [arg1, arg2, null, null];
        }

        if (typeof arg2 === 'string') {
          if (typeof arg3 === 'function') {
            return [arg1, {}, arg2, arg3];
          }
          return [arg1, {}, arg2, null];
        }

        if (typeof arg3 === 'function') {
          return [arg1, {}, null, arg3];
        }
        return [arg1, {}, null, null];
      }
      return [null, null, null, null];

    case 4:
      if ((typeof arg1 === 'string')
        && typeof arg2 === 'object' && arg2.method
        && typeof arg3 === 'string'
        && typeof arg4 === 'function') {
        return [arg1, arg2, arg3, arg4];
      }
      if ((typeof arg1 === 'string')
        && typeof arg2 === 'object' && arg2.method
        && typeof arg3 === 'string') {
        return [arg1, arg2, arg3, null];
      }
      return [null, null, null, null];

    default:
      // > 4
      if ((typeof arg1 === 'string')
        && typeof arg2 === 'object' && arg2.method
        && typeof arg3 === 'string'
        && typeof arg4 === 'function') {
        return [arg1, arg2, arg3, arg4];
      }
      return [null, null, null, null];
  }
}

/**
 * Fetches data on the server.
 *
 * Nota:
 * By default, fetch returns text data. If you want to return json data, you
 * have to pass the argument 'json'. For instance, to get a json file from
 * the server:
 *  . Fetch('/', 'json', (json) => {
 *      //
 *   })
 *
 * @function (...args)
 * @public
 * @param {...}             the optional arguments [url, options, type, callback],
 * @returns {}              -,
 * @since 0.0.0
 */
function _fetch(url, options, type, callback) /* istanbul ignore next */{
  fetch(url, options)
    .then((resp) => {
      if (resp.ok) {
        return type === 'json' ? resp.json() : resp.text();
      }
      return Promise.reject(resp);
    })
    .then((data) => {
      if (callback) {
        callback(null, data);
      } else {
        /* eslint-disable-next-line no-console */
        console.log('warning: fetch gets no callback!');
      }
    })
    .catch((err) => {
      if (callback) {
        callback(err);
      } else {
        /* eslint-disable-next-line no-console */
        console.log('warning: fetch gets no callback!');
      }
    });
}


// -- Public Static Methods ------------------------------------------------

const Fetch = {

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
  fetch(...args) /* istanbul ignore next */{
    const [url, options, type, callback] = _getArgs(...args);
    _fetch(url, options, type || 'json', (err, data) => {
      if (callback) callback(err, data);
    });
    return this;
  },
};


// -- Export
export default Fetch;

/* eslint-enable one-var, semi-style, no-underscore-dangle */
