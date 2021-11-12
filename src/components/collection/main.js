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
 *  . _init                       makes private init. after creation,
 *
 *
 * Empty Public Methods:
 *  . initialize                  makes extra initializations,
 *  . listen                      listens for events,
 *
 *
 * Public Methods:
 *  . get                         gets a model from its cid or id,
 *  . each                        returns the models one by one,
 *  . set                         to be done .........,
 *  . empty                       deletes the collection,
 *  . add                         adds one or many objects to the collection,
 *  . remove                      removes model(s) from the collection,
 *  . fetch                       retrieves new models from the server,
 *  . save                        adds or updates a set of model(s) on the server,
 *  . delete                      deletes a set of models from server and collection,
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
import M from '../model/main';
import U from '../../utils/util1';
import U1 from './private/util1';
import U2 from './private/util2';
import U3 from './private/util3';


// -- Local Constants


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
    this.add(args[0]);
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
  get(id) {
    return U2.get(this, id);
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
  each(callback) {
    for (let i = 0; i < this._models.length; i++) {
      callback(this._models[i], i);
    }
    return this;
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
  empty() {
    this._ids = [];
    this._cids = [];
    this._models = [];
    return this;
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
  add(models, options) {
    return U1.add(this, models, options);
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
  remove(arg, options) {
    return U1.remove(this, arg, options);
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
  fetch(...args) {
    U1.fetch(this, ...args);
    return this;
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
  save(...args) {
    U3.save(this, this.url, ...args);
    return this;
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
  delete(...args) {
    U2.delete(this, ...args);
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
export default { Collection };

/* eslint-enable one-var, semi-style, no-underscore-dangle */
