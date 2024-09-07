/** ************************************************************************
 *
 * Defines the Spine.View object.
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
 *  . View                        creates the Spine.View object,
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
 *  . $listen                     listens for events,
 *  . $render                     renders the View in the DOM,
 *
 *
 * Public Methods:
 *  . none,
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
 * @returns {Object}        returns the View object,
 * @since 0.0.0
 */
/* eslint-disable prefer-spread, prefer-rest-params */
const View = function(methods) {
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
   * @param {}            -,
   * @returns {Object}    return this,
   * @since 0.0.0
   */
  _init() {
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

  /**
   * Renders the View in the DOM.
   * (empty public method - could be overwritten)
   *
   * @method ()
   * @public
   * @param {}              -,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  render() {},
  $render() {
    return this;
  },


  // -- Public Methods -----------------------------------------------------
  // none,
};


// -- Export
export default { View };

/* eslint-enable one-var, semi-style, no-underscore-dangle */
