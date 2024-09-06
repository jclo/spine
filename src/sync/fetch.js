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
 *  . _fetchServer                fetches data on the server,
 *  .  _fetch                     formats returned value,
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
 * @function (arg1, arg2, arg3)
 * @public
 * @param {String}          the server url & api,
 * @param {Object}          the fetch parameters,
 * @param {Function}        the function to call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
// function _oldfetch(url, options, type, callback) /* istanbul ignore next */{
//   fetch(url, options)
//     .then((resp) => {
//       if (resp.ok) {
//         return type === 'json' ? resp.json() : resp.text();
//       }
//       return Promise.reject(resp);
//     })
//     .then((data) => {
//       if (callback) {
//         callback(null, data);
//       } else {
//         /* eslint-disable-next-line no-console */
//         console.log('warning: fetch gets no callback!');
//       }
//     })
//     .catch((err) => {
//       if (callback) {
//         callback(err);
//       } else {
//         /* eslint-disable-next-line no-console */
//         console.log('warning: fetch gets no callback!');
//       }
//     });
// }
function _fetchServer(url, options, callback) /* istanbul ignore next */{
  let status;

  fetch(url, options)
    .then((response) => {
      if (response.ok) {
        return response.text();
      }
      status = response.status;
      return Promise.reject(response);
    })
    .then((data) => {
      callback(null, data);
    })
    .catch((error) => {
      if (error && error.text) {
        error.text()
          .then((err) => { callback(err || { status, message: 'none!', statusText: 'none!' }); })
        ;
      } else {
        console.log(error);
      }
    })
  ;
}

/**
 * Fetches data.
 *
 * @function (arg1, arg2, arg3, arg4)
 * @public
 * @param {String}          the server url & api,
 * @param {Object}          the fetch parameters,
 * @param {String}          the returned format (string or json),
 * @param {Function}        the function to call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function _fetch(url, options, type, callback) {
  _fetchServer(url, options, (err, data) => {
    if (err && type === 'json') {
      let nerr;
      try {
        nerr = JSON.parse(err);
        // statusText is to keep compatibility with previous versions.
        // (to be removed by the end of 2023)
        nerr.statusText = nerr.message;
      } catch (e) {
        nerr = { status: '40x', message: err, statusText: err };
      }
      callback(nerr);
      return;
    }

    if (err) {
      callback(err);
      return;
    }

    if (type === 'json') {
      let ndata;
      try {
        ndata = JSON.parse(data);
      } catch (e) {
        ndata = data;
      }
      callback(null, ndata);
      return;
    }

    callback(null, data);
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
