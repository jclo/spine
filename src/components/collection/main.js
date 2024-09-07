/** ************************************************************************
 *
 * Defines Spine.Collection.
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
 *  . Collection                  returns the extended Spine.Collection object,
 *
 *
 * Private Methods:
 *  . _intInitialize              checks if it needs to use $initialize or initialize,
 *  . _intListen                  checks if it needs to use $listen or listen,
 *  . _init                       makes private init. after creation,
 *
 *
 * Empty Public Methods:
 *  . $initialize                 makes extra initializations,
 *  . $listen                     listens for events,
 *
 *
 * Public Methods:
 *  . $get                        gets a model from its cid or id,
 *  . $each                       returns the models one by one,
 *  . $next                       returns the next model from the given model,
 *  . $previous                   returns the previous model from the given model,
 *  . $length                     returns the number of models in the collection,
 *  . $set                        to be done .........,
 *  . $empty                      deletes the collection,
 *  . $add                        adds one or many objects to the collection,
 *  . $remove                     removes model(s) from the collection,
 *  . $fetch                      retrieves new models from the server,
 *  . $save                       adds or updates a set of model(s) on the server,
 *  . $delete                     deletes a set of models from server and collection,
 *  . $urify                      extends url with query parameters,
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
import KZlog from '@mobilabs/kzlog';


// -- Local Modules
import config from '../../config';
import _ from '../../libs/_';
import Generic from '../generic/main';
import M from '../model/main';
import U from '../../utils/util1';
import U1 from './private/util1';
import U2 from './private/util2';
import U3 from './private/util3';


// -- Local Constants
const { level } = config.logger
    , log       = KZlog('Spine', level, false)
    ;


// -- Local Variables
let cmethods;


// -- Public ---------------------------------------------------------------

/**
 * Returns the Spine.Collection object.
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
const Collection = function(methods) {
  let args;
  const Child = function() {
    if (this instanceof Child) {
      Generic.Construct.apply(this, args);
      this._intInitialize.apply(this, args);
      this._intListen.apply(this);
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
  const p2 = _.assign(p1, cmethods);
  Child.prototype = _.assign(p2, methods || {});
  Child.prototype.constructor = Child;
  return Child;
};
/* eslint-enable prefer-spread, prefer-rest-params */


// -- Public Methods -------------------------------------------------------

cmethods = {

  // -- Private Methods ----------------------------------------------------

  /**
   * Checks if it needs to use $initialize or the deprecated initialize method.
   *
   * @method ()
   * @private
   * @param {}              -,
   * @returns {}            -,
   * @since 0.0.0
   */
  _intInitialize(...args) {
    if (!/^initialize\((.*)\)[^{]+\{\s*\}/m.test(this.initialize.toString())
    ) {
      log.warn('initialize method is deprecated, use $initialize instead!');
      this.initialize(...args);
      return;
    }
    this.$initialize(...args);
  },

  /**
   * Checks if it needs to use $listen or the deprecated listen method.
   *
   * @method ()
   * @private
   * @param {}              -,
   * @returns {}            -,
   * @since 0.0.0
   */
  _intListen() {
    if (!/^listen\((.*)\)[^{]+\{\s*\}/m.test(this.listen.toString())
    ) {
      log.warn('listen method is deprecated, use $listen instead!');
      this.listen();
      return;
    }
    this.$listen();
  },

  /**
   * Makes initializations when the object is constructed.
   *
   * @method ([arg0])
   * @private
   * @param {}              -,
   * @returns {Object}      return this,
   * @since 0.0.0
   */
  _init(...args) {
    this._ids = [];
    this._cids = [];
    this._models = [];
    this.url = this.url || null;
    this.model = this.model || M.Model();
    this.$add(args[0]);
    return this;
  },


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
  initialize() {},
  $initialize() {
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
  listen() {},
  $listen() {
    return this;
  },


  // -- Public Methods -----------------------------------------------------

  /**
   * Gets a model from a collection specified by its cid or id.
   * (public method - must not be overwritten)
   *
   * @method (arg1)
   * @public
   * @param {String/Number} the cid or id of the model,
   * @returns {Object}      returns the found model or null,
   * @since 0.0.0
   */
  $get(id) {
    return U2.get(this, id);
  },
  get(id) {
    log.warn('get method is deprecated, use $get instead!');
    return this.$get(id);
  },

  /**
   * Returns all the models from a collection one by one.
   * (public method - must not be overwritten)
   *
   * @method (arg1)
   * @public
   * @param {Function}      the function to call at each iteration,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  $each(callback) {
    for (let i = 0; i < this._models.length; i++) {
      callback(this._models[i], i);
    }
    return this;
  },
  each(callback) {
    log.warn('each method is deprecated, use $each instead!');
    return this.$each(callback);
  },

  /**
   * Returns the next model in a collection from the passed-in model.
   * (public method - must not be overwritten)
   *
   * @method (arg1)
   * @public
   * @param {String/Number} the cid or id of the model,
   * @returns {Object}      returns the found model or null,
   * @since 0.0.0
   */
  $next(id) {
    return U2.next(this, id);
  },
  next(id) {
    log.warn('next method is deprecated, use $next instead!');
    return this.$next(id);
  },

  /**
   * Returns the previous model in a collection from the passed-in model.
   * (public method - must not be overwritten)
   *
   * @method (arg1)
   * @public
   * @param {String/Number} the cid or id of the model,
   * @returns {Object}      returns the found model or null,
   * @since 0.0.0
   */
  $previous(id) {
    return U2.previous(this, id);
  },
  previous(id) {
    log.warn('previous method is deprecated, use $previous instead!');
    return this.$previous(id);
  },

  /**
   * Returns the collection length.
   * (public method - must not be overwritten)
   *
   * @method ()
   * @public
   * @param {}              -,
   * @returns {Number}      returns the collection length,
   * @since 0.0.0
   */
  $length() {
    return this._models.length;
  },
  length() {
    log.warn('length method is deprecated, use $length instead!');
    return this.$length();
  },

  /**
   * Deletes the collection.
   * (public method - must not be overwritten)
   *
   * Nota:
   * It empties the collection but it doesn't delete the model from the
   * server. If you want to remove models from the collection and from
   * the server, you have to use the 'remove' method.
   *
   * @method ()
   * @public
   * @param {}              -,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  $empty() {
    this._ids = [];
    this._cids = [];
    this._models = [];
    return this;
  },
  empty() {
    log.warn('empty method is deprecated, use $empty instead!');
    return this.$empty();
  },

  /**
   * Adds a model to the collection.
   * (public method - must not be overwritten)
   *
   * Nota:
   * adds a model to the collection except if a model with the same
   * id already exist otherwise updates this model in the collection.
   * Each time a model is added, the event 'add' is fired.
   * When all the models are added the event 'addcomplete' is fired.
   *
   * The add method doesn't update the server. It you want to add the new
   * model to the server, you need to call the 'fetch' model method on
   * 'add' event.
   *
   * However, the 'add' method is used by 'fetch' to update the collection.
   * As, fetch doesn't want to fire 'add' and 'addcomplete' events, it uses
   * 'add' method with { silent: true } to prevent 'add' method firing events
   * in this case.
   *
   * @method (arg1, [arg2])
   * @public
   * @param {Object/Array}  one or many objects to add,
   * @param {Object}        options to disable firing events,
   * @returns {Array}       returns the added models,
   * @since 0.0.0
   */
  $add(models, options) {
    return U1.add(this, models, options);
  },
  add(models, options) {
    log.warn('add method is deprecated, use $add instead!');
    return this.$add(models, options);
  },

  /**
   * Removes model(s) from the collection.
   * (public method - must not be overwritten)
   *
   * Nota:
   * It removes a model or a set of models from a collection but not from
   * the server. It fires the 'remove' event for each model removed and an
   * 'removecomplete' afterwards. Firing could be disabled with the option
   * { silent: true }.
   * if you want to remove the model from the server too, you need to call
   * the model's 'delete' method.
   *
   * @method (arg1, [arg2])
   * @public
   * @param {String/Object} the cid, id or model to remove or arrays of,
   * @param {Object}        options to disable firing events,
   * @returns {Array}       returns the removed models,
   * @since 0.0.0
   */
  $remove(arg, options) {
    return U1.remove(this, arg, options);
  },
  remove(arg, options) {
    log.warn('remove method is deprecated, use $remove instead!');
    return this.$remove(arg, options);
  },

  /**
   * Retrieves new models from the server.
   * (public method - must not be overwritten)
   *
   * Nota:
   * The retrieved new collection is appended to the current collection.
   * If you want a fresh new collection, you must empty the previous
   * one first.
   *
   * @method ([arg1], [arg2])
   * @public
   * @param {Object}        the query parameters,
   * @param {Function}      the function to call at the completion,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  $fetch(...args) {
    U1.fetch(this, ...args);
    return this;
  },
  fetch(...args) {
    log.warn('fetch method is deprecated, use $fetch instead!');
    return this.$fetch(...args);
  },

  /**
   * Adds or updates a set of model(s) on the server.
   * (public method - must not be overwritten)
   *
   * Nota:
   * Fires a 'save' event if not silent ({ silent: true }).
   *
   * @method (arg1, arg2, [arg3], [arg4])
   * @public
   * @param {String}        the where clause,
   * @param {Object}        the attributes to update,
   * @param {Object}        the options,
   * @param {Function}      the function to call at the completion,
   * @returns {Object}      this,
   * @since 0.0.0
   */
  $save(...args) {
    U3.save(this, this.url, ...args);
    return this;
  },
  save(...args) {
    log.warn('save method is deprecated, use $save instead!');
    return this.$save(...args);
  },

  /**
   * Deletes a set of models from the server.
   * (public method - must not be overwritten)
   *
   * Nota:
   * It removes a set of models from the server and the collection. It fires
   * the 'delete' event when it's done. Firing could be disabled with the option
   * { silent: true }.
   *
   * @method (arg1, [arg2], [arg3])
   * @public
   * @param {Array}         the list of ids to remove,
   * @param {Object}        the optional parameters,
   * @param {Function}      the function to call at the completion,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  $delete(...args) {
    U2.delete(this, ...args);
    return this;
  },
  delete(...args) {
    log.warn('delete method is deprecated, use $delete instead!');
    return this.$delete(...args);
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
  $urify(...args) {
    return U.urify(...args);
  },
  urify(...args) {
    log.warn('urify method is deprecated, use $urify instead!');
    return this.$urify(...args);
  },
};


// -- Export
export default { Collection };

/* eslint-enable one-var, semi-style, no-underscore-dangle */
