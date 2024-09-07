/** ************************************************************************
 *
 * Implements the fetch method.
 *
 * fetch.js is just a literal object that contains a set of functions. It
 * can't be intantiated.
 *
 * Private Functions:
 *  . _getArgs4FetchAndDelete     decodes the fetch and delete arguments,
 *  . _getArgs4Save               decodes the save arguments,
 *  . _fetch                      retrieves one object from the server,
 *  . _save                       sends one object to the server,
 *  . _delete                     removes a model from the server,
 *
 *
 * Public Static Methods:
 *  . fetch                       retrieves one object from the server,
 *  . save                        sends one object to the server,
 *  . delete                      removes a model from the server,
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
import U from '../../../utils/util1';


// -- Local Constants


// -- Local Variables


// -- Private Functions ----------------------------------------------------

/**
 * Decodes the delete arguments.
 *
 * @function ([arg1], [arg2])
 * @private
 * @param {Object}          the options,
 * @param {Function}        the function to call at the completion
 * @returns {Array}         returns an object with options, callback,
 * @since 0.0.0
 */
function _getArgs4FetchAndDelete(...args) {
  const [arg1, arg2] = args;
  switch (args.length) {
    case 0:
      return [{}, null];

    case 1:
      if (_.isLiteralObject(arg1)) {
        return [arg1, null];
      }
      if (_.isFunction(arg1)) {
        return [{}, arg1];
      }
      return [{}, null];

    default:
      if (_.isLiteralObject(arg1) && _.isFunction(arg2)) {
        return [arg1, arg2];
      }
      if (_.isLiteralObject(arg1)) {
        return [arg1, null];
      }
      if (_.isFunction(arg1)) {
        return [{}, arg1];
      }
      return [{}, null];
  }
}

/**
 * Decodes the save arguments.
 *
 * @function ([arg1], [arg2], [arg3])
 * @private
 * @param {Object}          the modified model properties,
 * @param {Object}          the options,
 * @param {Function}        the function to call at the completion
 * @returns {Array}         returns an object with properties, options, callback,
 * @since 0.0.0
 */
function _getArgs4Save(...args) {
  const [arg1, arg2, arg3] = args;
  switch (args.length) {
    case 0:
      return [null, null, null];

    case 1:
      if (_.isLiteralObject(arg1)) {
        return [arg1, {}, null];
      }
      return [null, null, null];

    case 2:
      if (_.isLiteralObject(arg1) && _.isLiteralObject(arg2)) {
        return [arg1, arg2, null];
      }
      if (_.isLiteralObject(arg1) && _.isFunction(arg2)) {
        return [arg1, {}, arg2];
      }
      if (_.isLiteralObject(arg1)) {
        return [arg1, {}, null];
      }
      return [null, null, null];

    default:
      if (_.isLiteralObject(arg1) && _.isLiteralObject(arg2) && _.isFunction(arg3)) {
        return [arg1, arg2, arg3];
      }
      if (_.isLiteralObject(arg1) && _.isLiteralObject(arg2)) {
        return [arg1, arg2, null];
      }
      if (_.isLiteralObject(arg1) && _.isFunction(arg2)) {
        return [arg1, {}, arg2];
      }
      if (_.isLiteralObject(arg1)) {
        return [arg1, {}, null];
      }
      return [null, null, null];
  }
}

/**
 * Retrieves one object from the server.
 *
 * @function (arg1, arg2, arg3, arg4)
 * @private
 * @param {Object}          the model object,
 * @param {String}          the server url,
 * @param {Object}          the fetch options,
 * @param {Function}        the function to call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
/* eslint-disable no-param-reassign */
function _fetch(model, url, ...args) {
  const [opts, callback] = _getArgs4FetchAndDelete(...args);

  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  let nurl;
  if (opts.params || opts.query) {
    nurl = U.getUrl(url, opts);
  } else {
    nurl = model._attributes.id
      ? `${url}/${model._attributes.id}`
      : `${url}/1`;
  }

  const type = opts.type === 'text' ? 'text' : 'json';
  F.fetch(nurl, options, type, (err, data) => {
    if (err) {
      if (callback) callback(err);
      return;
    }
    model._attributes = model._parse(data, opts);
    if (!opts.silent) model.$fire('load', model._attributes);
    if (callback) {
      callback(null, model._attributes);
    }
  });
}
/* eslint-enable no-param-reassign */

/**
 * Sends one object to the server.
 *
 * @function (arg1, arg2, arg3, [arg4], [arg5])
 * @private
 * @param {Object}          the model object,
 * @param {String}          the server url,
 * @param {Object}          the updated attributes,
 * @param {Object}          the options,
 * @param {Function}        the function to call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function _save(model, url, ...args) {
  const [changed, opts, callback] = _getArgs4Save(...args);
  if (!changed) return;

  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(changed),
  };

  const type = opts.type === 'text' ? 'text' : 'json';
  F.fetch(url, options, type, (err, res) => {
    if (err) {
      if (callback) callback(err);
    } else {
      if (!opts.silent) model.$fire('save', res);
      if (callback) callback(err, res);
    }
  });
}

/**
 * Removes a model from the server.
 *
 * @function (arg1, arg2, [arg3])
 * @public
 * @param {Object}          the model object,
 * @param {String}          the server url,
 * @param {Function}        the function to call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function _delete(model, url, ...args) {
  const [opts, callback] = _getArgs4FetchAndDelete(...args)
      , id                  = model.$get('id')
      ;

  if (!id) {
    if (callback) callback(null, 'This model has no id. Thus, it does not exist on the server!');
    return;
  }

  if (!url) {
    if (callback) callback(null, 'This model has no url!');
    return;
  }

  const options = {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  const type = opts.type === 'text' ? 'text' : 'json';
  F.fetch(`${url}/${id}`, options, type, (err, res) => {
    if (err) {
      if (callback) callback(err);
    } else {
      if (!opts.silent) model.$fire('delete', res);
      if (callback) callback(err, res);
    }
  });
}


// -- Public Static Methods ------------------------------------------------

const Util = {

  /**
   * Retrieves one object from the server.
   *
   * @method (arg1, arg2, [arg3], [arg4)
   * @public
   * @param {Object}          the model object,
   * @param {String}          the server url,
   * @param {Object}          the fetch options,
   * @param {Function}        the function to call at the completion,
   * @returns {Object}        returns this,
   * @since 0.0.0
   */
  fetch(model, url, ...args) {
    _fetch(model, url, ...args);
    return this;
  },

  /**
   * Sends one object to the server.
   *
   * @method (arg1, arg2, arg3, [arg4], [arg5])
   * @public
   * @param {Object}        the model object,
   * @param {String}        the server url,
   * @param {Object}        the updated attributes,
   * @param {Object}        the options,
   * @param {Function}      the function to call at the completion,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  save(model, url, ...args) {
    _save(model, url, ...args);
    return this;
  },

  /**
   * Removes a model from the server.
   *
   * @method (arg1, arg2, [arg3], [arg4])
   * @public
   * @param {Object}          the model object,
   * @param {String}          the server url,
   * @param {Object}          the options,
   * @param {Function}        the function to call at the completion,
   * @returns {Object}        returns this,
   * @since 0.0.0
   */
  delete(model, url, ...args) {
    _delete(model, url, ...args);
    return this;
  },
};


// -- Export
export default Util;

/* eslint-enable one-var, semi-style, no-underscore-dangle */
