/** ************************************************************************
 *
 * Defines Spine.Model.
 *
 * pseudoclassical-auto.js is built upon a variation of the Pseudoclassical
 * Instantiation pattern. The object is instantiated by the new keyword
 * included in the constructor. The caller just needs to call the
 * constructor without the new keyword to get in return the object.
 *
 * Private Functions:
 *  . none,
 *
 *
 * Constructor:
 *  . Model                       returns the extended Spine.Model object,
 *
 *
 * Private Methods:
 *  . _init                       makes private init. after creation,
 *  . _parse                      parses the received object.
 *
 *
 * Empty Public Methods:
 *  . initialize                  makes extra initializations,
 *  . listen                      listens for events,
 *  . parse                       parses the downloaded object or bypass,
 *
 *
 * Public Methods:
 *  . get                         returns the value of the req. model property,
 *  . getAll                      returns an object with all the key/values,
 *  . set                         sets or updates model properties,
 *  . remove                      removes model property(ies),
 *  . has                         checks if the model has the property,
 *  . fetch                       retrieves a model from the server,
 *  . save                        sends a model to the server,
 *  . delete                      deletes a model from the server,
 *  . urify                       extends url with query parameters,
 *
 *
 *
 * @namespace    Spine
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
import _ from '../../libs/_';
import Generic from '../generic/main';
import U from '../../utils/util1';
import F from './private/fetch';
import U1 from './private/util';


// -- Local Constants


// -- Local Variables
let mmethods;


// -- Public ---------------------------------------------------------------

/**
 * Returns the Spine.Model object.
 * (Pseudoclassical Instantation Pattern with auto instantatiation
 * - no need for new)
 *
 * @constructor (arg1)
 * @public
 * @param {String}          the argument to be saved as an object variable,
 * @returns {Object}        returns the Spine object,
 * @since 0.0.0
 */
/* eslint-disable prefer-spread, prefer-rest-params */
const Model = function(methods) {
  let args;
  const Child = function() {
    if (this instanceof Child) {
      Generic.Construct.apply(this, args);
      this.initialize.apply(this, args);
      this.listen.apply(this);
      return this;
    }
    args = arguments;
    return new Child();
  };

  // We created our own assign method as Object.assign does not preserve
  // the getters and setters. So, do not use Object.assign here! And, do not
  // do this 'Child.prototype = _.assign(Generic.methods, methods)'! You will
  // copy the references instead of cloning the methods. And all the childs
  // will get the methods of the last created child.
  const p1 = _.assign({}, Generic.methods);
  const p2 = _.assign(p1, mmethods);
  Child.prototype = _.assign(p2, methods || {});
  Child.prototype.constructor = Child;
  return Child;
};
/* eslint-enable prefer-spread, prefer-rest-params */


// -- Public Methods -------------------------------------------------------

mmethods = {

  // -- Private Methods ----------------------------------------------------

  /**
   * Makes initializations when the object is constructed.
   *
   * @method (...args)
   * @private
   * @param {}              -,
   * @returns {Object}      return this,
   * @since 0.0.0
   */
  _init(...args) {
    this.url = this.url || null;
    this.defaults = this.defaults || {};
    const [obj, options] = args;
    this._attributes = this._parse(obj, options);
    return this;
  },

  /**
   * Parses the received object.
   *
   * @method (arg1, arg2)
   * @private
   * @param {Object}        the received object,
   * @param {Object}        the options,
   * @returns {Object}      return the parsed object,
   * @since 0.0.0
   */
  /* eslint-disable no-restricted-syntax */
  _parse(data, options) {
    let obj = data || {};
    obj = options && options.parse ? this.parse(obj) : obj;
    for (const item in this.defaults) {
      if (!obj[item]) {
        obj[item] = this.defaults[item];
      }
    }
    return obj;
  },
  /* eslint-enable no-restricted-syntax */


  // -- Empty Public Methods -----------------------------------------------

  /**
   * Makes the initializations.
   * (empty public method - could be overwritten)
   *
   * @method ()
   * @public
   * @param {}              -,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  initialize() {
    return this;
  },

  /**
   * Listens for events.
   * (empty public method - could be overwritten)
   *
   * @method ()
   * @public
   * @param {}              -,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  listen() {
    return this;
  },

  /**
   * Parses the downloaded file.
   * (empty public method - could be overwritten)
   *
   * @method (arg1)
   * @public
   * @param {String}        the downloaded json file,
   * @returns {String}      returns the downloaded file,
   * @since 0.0.0
   */
  parse(attributes) {
    return attributes;
  },


  // -- Public Methods -----------------------------------------------------

  /**
   * Returns the value of the requested model property.
   * (public method - must not be overwritten)
   *
   * @method (arg1)
   * @public
   * @param {String}        the model property,
   * @returns {...}         returns the value of this property,
   * @since 0.0.0
   */
  get(prop) {
    return typeof prop === 'string' ? this._attributes[prop] : null;
  },

  /**
   * Returns an object containing all the model properties.
   * (public method - must not be overwritten)
   *
   * @method ()
   * @public
   * @param {}              -,
   * @returns {Object}      returns the model properties,
   * @since 0.0.0
   */
  getAll() {
    return { ...this._attributes };
  },

  /**
   * Sets or updates model properties.
   * (public method - must not be overwritten)
   *
   * Nota:
   * Fires a 'change' event if not silent ({ silent: true }).
   *
   * @method (arg1, arg2)
   * @public
   * @param {Object/String} the properties or one property,
   * @returns {Object/.}    the options or the property value,
   * @since 0.0.0
   */
  set(...args) {
    return U1.set(this, ...args);
  },

  /**
   * Removes one or a set of model property(ies).
   * (public method - must not be overwritten)
   *
   * Nota:
   * It removes a property or a set of properties from a model but not from
   * the server. It fires the 'remove:prop' event for each property removed
   * and a 'remove' afterwards. Firing could be disabled with the option
   * { silent: true }.
   * if you want to update the model on the server too, you need to call
   * the 'save' method.
   *
   * @method (arg1, arg2)
   * @public
   * @param {Object/String} the properties or one property,
   * @returns {Object}      returns the removed properties and their values,
   * @since 0.0.0
   */
  remove(...args) {
    return U1.remove(this, ...args);
  },

  /**
   * Checks if the model has the passed-in property.
   * (public method - must not be overwritten)
   *
   * @method (arg1)
   * @public
   * @param {String}        the property,
   * @returns {Boolean}     returns true if the property exist otherwise false,
   * @since 0.0.0
   */
  has(prop) {
    if (typeof prop === 'string' && prop in this._attributes) {
      return true;
    }
    return false;
  },

  /**
   * Retrieves a model from the server.
   * (public method - must not be overwritten)
   *
   * Nota:
   * Fires a 'load' event if not silent ({ silent: true }).
   *
   * @method ([arg1], [arg2])
   * @public
   * @param {Object}        the options,
   * @param {Function}      the function to call at the completion,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  fetch(...args) {
    F.fetch(this, this.url, ...args);
    return this;
  },

  /**
   * Adds or updates a model on the server.
   * (public method - must not be overwritten)
   *
   * Nota:
   * Fires a 'save' event if not silent ({ silent: true }).
   *
   * @method (arg1, [arg2], [arg3])
   * @public
   * @param {Object}        the updated attributes,
   * @param {Object}        the options,
   * @param {Function}      the function to call at the completion,
   * @returns {Object}      this,
   * @since 0.0.0
   */
  save(...args) {
    F.save(this, this.url, ...args);
    return this;
  },

  /**
   * Removes a model from the server.
   * (public method - must not be overwritten)
   *
   * Nota:
   * Fires a 'delete' event if not silent ({ silent: true }).
   *
   * @method ([arg1], [arg2])
   * @public
   * @param {Object}        the options,
   * @param {Function}      the function to call at the completion,
   * @returns {Object}      this,
   * @since 0.0.0
   */
  delete(...args) {
    F.delete(this, this.url, ...args);
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
};


// -- Export
export default { Model };

/* eslint-enable one-var, semi-style, no-underscore-dangle */
