/** ************************************************************************
 *
 * Implements a few utility primitives.
 *
 * util.js is just a literal object that contains a set of functions. It
 * can't be intantiated.
 *
 * Private Functions:
 *  . _getSetArgs                 decodes the arguments,
 *  . _getRmArgs                  decodes the arguments,
 *  . _remove                     removes the passed-in properties from a model,
 *  . _set                        updates the model,
 *
 *
 * Public Static Methods:
 *  . set                         updates the model,
 *  . remove                      removes the passed-in properties from a model,
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


// -- Local Constants


// -- Local Variables


// -- Private Functions ----------------------------------------------------

/**
 * Decodes the arguments.
 *
 * @function (arg1, arg2)
 * @private
 * @param {Object/String}   the properties or one propery,
 * @param {Object/...}      the options or the property value,
 * @returns {Array}         returns an object with properties and options,
 * @since 0.0.0
 */
function _getSetArgs(...args) {
  const [arg1, arg2, arg3] = args
      , obj = {}
      ;

  switch (args.length) {
    case 0:
      return [{}, {}];

    case 1:
      // must be: set({ a: 1 })
      if (_.isLiteralObject(arg1)) {
        return [arg1, {}];
      }
      return [{}, {}];

    case 2:
      // must be: set({ a: 1}, options)
      if (_.isLiteralObject(arg1) && _.isLiteralObject(arg2)) {
        return [arg1, arg2];
      }
      // or must be: set('a', 1)
      if (_.isString(arg1)) {
        obj[arg1] = arg2;
        return [obj, {}];
      }
      return [{}, {}];

    default:
      // must be: set('a', 1, options)
      if (_.isString(arg1) && _.isLiteralObject(arg3)) {
        obj[arg1] = arg2;
        return [obj, arg3];
      }
      // or must be: set('a', 1, ignored furbish)
      if (_.isString(arg1)) {
        obj[arg1] = arg2;
        return [obj, {}];
      }
      return [{}, {}];
  }
}

/**
 * Decodes the arguments.
 *
 * @function (arg1, arg2)
 * @private
 * @param {Object/String}   the properties or one propery,
 * @param {Object/...}      the options or the property value,
 * @returns {Array}         returns an object with properties and options,
 * @since 0.0.0
 */
function _getRmArgs(...args) {
  const [arg1, arg2] = args;

  switch (args.length) {
    case 0:
      return [[], {}];

    case 1:
      if (_.isString(arg1)) {
        return [[arg1], {}];
      }
      if (_.isArray(arg1)) {
        return [arg1, {}];
      }
      if (_.isLiteralObject(arg1)) {
        return [[], arg1];
      }
      return [[], {}];

    default:
      if (_.isString(arg1) && _.isLiteralObject(arg2)) {
        return [[arg1], arg2];
      }
      if (_.isArray(arg1) && _.isLiteralObject(arg2)) {
        return [arg1, arg2];
      }
      if (_.isString(arg1)) {
        return [[arg1], {}];
      }
      if (_.isArray(arg1)) {
        return [arg1, {}];
      }
      if (_.isLiteralObject(arg1)) {
        return [[], arg1];
      }
      if (_.isLiteralObject(arg2)) {
        return [[], arg2];
      }
      return [[], {}];
  }
}

/**
 * Removes the passed-in properties from the model.
 *
 * @function (arg1, [args])
 * @private
 * @param {Object}         the model object,
 * @param {Array}          the extra arguments,
 * @returns {Object}       returns the removed properties and their values,
 * @since 0.0.0
 */
/* eslint-disable no-param-reassign */
function _remove(model, ...args) {
  const [obj, options] = _getRmArgs(...args)
      , mattr          = Object.keys(model._attributes)
      , out            = {}
      ;

  let o;
  obj.forEach((item) => {
    if (mattr.indexOf(item) > -1) {
      o = {};
      o[item] = model._attributes[item];
      out[item] = o[item];
      delete model._attributes[item];
      if (!options.silent) model.$fire('remove:prop', o);
    }
  });
  if (!options.silent) model.$fire('remove', out);
  return out;
}
/* eslint-enable no-param-reassign */

/**
 * Updates the model with the passed-in properties.
 *
 * @function (arg1, [args])
 * @private
 * @param {Object}         the model object,
 * @param {Array}          the extra arguments,
 * @returns {Object}       returns the updated model,
 * @since 0.0.0
 */
/* eslint-disable no-param-reassign, no-unused-vars,
  no-restricted-syntax */
function _set(model, ...args) {
  const [obj, options] = _getSetArgs(...args);
  const out = {};

  let match;
  for (const item in obj) {
    if ({}.hasOwnProperty.call(obj, item)) {
      if (model._attributes[item] !== obj[item]) {
        model._attributes[item] = obj[item];
        out[item] = obj[item];
        if (!options.silent) model.$fire(`change:${item}`, obj[item]);
        match = true;
      }
    }
  }
  if (model._attributes.id) out.id = model._attributes.id;
  if (!options.silent && match) model.$fire('change', out);
  return model._attributes;
}
/* eslint-enable no-param-reassign, no-unused-vars,
  no-restricted-syntax */


// -- Public Static Methods ------------------------------------------------

const Util = {

  /**
   * Updates the model with the passed-in properties.
   *
   * @method (arg1, [args])
   * @public
   * @param {Object}         the model object,
   * @param {Array}          the extra arguments,
   * @returns {Object}       returns the updated model,
   * @since 0.0.0
   */
  set(model, ...args) {
    return _set(model, ...args);
  },

  /**
   * Removes the passed-in properties from the model.
   *
   * @method (arg1, [args])
   * @public
   * @param {Object}         the model object,
   * @param {Array}          the extra arguments,
   * @returns {Object}       returns the removed properties and their values,
   * @since 0.0.0
   */
  remove(model, ...args) {
    return _remove(model, ...args);
  },
};


// -- Export
export default Util;

/* eslint-enable one-var, semi-style, no-underscore-dangle */
