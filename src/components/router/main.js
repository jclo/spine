/** ************************************************************************
 *
 * Defines the Spine.Router object.
 *
 * main.js is built upon a variation of the Pseudoclassical
 * Instantiation pattern. The object is instantiated by the new keyword
 * included in the constructor. The caller just needs to call the
 * constructor without the new keyword to get in return the object.
 *
 * Private Functions:
 *  . none,
 *
 *
 * Constructor:
 *  . Router                      creates and returns the Router object,
 *
 *
 * Private Methods:
 *  . _intInitialize              checks if it needs to use $initialize or initialize,
 *  . _intListen                  checks if it needs to use $listen or listen,
 *  . _init                       makes init when the object is constructed,
 *
 *
 * Empty Public Methods:
 *  . $initialize                 makes the initializations,
 *  . $listen                     listens for bus messages,
 *
 *
 * Public Methods:
 *  . $execute                    calls the matching route,
 *  . $navigate                   updates the url or triggers a route,
 *  . $getLastRoute               returns the latest route stored in the history,
 *  . $stop                       stops the router to listen for hash changes,
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
import KZlog from '@mobilabs/kzlog';


// -- Local Modules
import config from '../../config';
import _ from '../../libs/_';
import Generic from '../generic/main';
import History from '../history/main';
import Util from './util';


// -- Local Constants
const { level } = config.logger
    , log       = KZlog('Spine', level, false)
    ;


// -- Local Variables
let vmethods;


// -- Public ---------------------------------------------------------------

/**
 * Returns the child component constructor.
 *
 * This function creates a child component that inherits from the Generic
 * component and extends the Generic component with its own methods.
 * Then, this function returns the child component constructor.
 *
 * @constructor (arg1)
 * @public
 * @param {}                -,
 * @returns {Object}        returns the Spine.Router object,
 * @since 0.0.0
 */
/* eslint-disable prefer-spread, prefer-rest-params */
const Router = function(methods) {
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
  const p2 = _.assign(p1, vmethods);
  Child.prototype = _.assign(p2, methods || {});
  Child.prototype.constructor = Child;
  return Child;
};
/* eslint-enable prefer-spread, prefer-rest-params */


vmethods = {

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
   * @method (...args)
   * @private
   * @param {}              -,
   * @returns {Object}      return this,
   * @since 0.0.0
   */
  _init() {
    this._trigger = true;
    this._replace = false;
    this.routes = this.routes || {};
    Util.startListeningHashChange(this);
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
   * Listens for bus messages.
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
   * Calls the matching route.
   * (public method - could be overwritten)
   *
   * Nota:
   * it is called internally by the router whenever a route matches with
   * the function to be executed as the first argument. You can add here
   * some preprocessing stuff before calling the matching route or stopping
   * it.
   *
   * @method (arg1)
   * @public
   * @param {Function}      the function to call,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  $execute(callback, ...args) {
    if (callback) callback.apply(this, args);
    return this;
  },
  execute(callback, ...args) {
    log.warn('execute method is deprecated, use $execute instead!');
    return this.$execute(callback, ...args);
  },

  /**
   * Updates the URL or triggers a route.
   * (public method - must not be overwritten)
   *
   * Nota:
   * By default 'navigate' updates the url and the history. If trigger is set
   * to true, it calls the route. For instance, if you are at 'home' and you
   * want to set the url to 'home' and save it in this history, do:
   *  . navigate('home')
   * If you aren't at 'home' and you want to go, do:
   *  . navigate('home', { trigger: true }).
   *
   * If you don't want to update the history, set 'replace' to true.
   *
   * @method (arg1, [arg2])
   * @public
   * @param {String}        the route,
   * @param {Object}        trigger or not & update history or not,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  $navigate(path, options) {
    this._trigger = options && options.trigger;
    this._replace = options && options.replace;
    /* eslint-disable-next-line no-restricted-globals */
    location.hash = `#${path}`;
    return this;
  },
  navigate(path, options) {
    log.warn('navigate method is deprecated, use $navigate instead!');
    return this.$navigate(path, options);
  },

  /**
   * Returns the latest route stored in the history.
   * (public method - mist not be overwritten)
   *
   * @method ()
   * @public
   * @param {}              -,
   * @returns {String}      returns the route stored in the history,
   * @since 0.0.0
   */
  $getLastRoute() {
    return History.get();
  },
  getLastRoute() {
    log.warn('getLastRoute method is deprecated, use $getLastRoute instead!');
    return this.$getLastRoute();
  },

  /**
   * Stops the router to listen for hash changes.
   * (public method - mist not be overwritten)
   *
   * @method ()
   * @public
   * @param {}              -,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  $stop() {
    Util.stopListeningHashChange();
    return this;
  },
  stop() {
    log.warn('stop method is deprecated, use $stop instead!');
    return this.$stop();
  },
};


// -- Export
export default { Router };

/* eslint-enable one-var, semi-style, no-underscore-dangle */
