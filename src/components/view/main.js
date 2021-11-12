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
 *  . _init                       makes init when the object is constructed,
 *
 *
 * Empty Public Methods:
 *  . initialize                  makes the initializations,
 *  . listen                      listens for events,
 *  . render                      renders the View in the DOM,
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


// -- Local Modules
import _ from '../../libs/_';
import Generic from '../generic/main';


// -- Local Constants


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
  const p2 = _.assign(p1, vmethods);
  Child.prototype = _.assign(p2, methods || {});
  Child.prototype.constructor = Child;
  return Child;
};
/* eslint-enable prefer-spread, prefer-rest-params */


vmethods = {

  // -- Private Methods ----------------------------------------------------

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
   * Renders the View in the DOM.
   * (empty public method - could be overwritten)
   *
   * @method ()
   * @public
   * @param {}              -,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  render() {
    return this;
  },


  // -- Public Methods -----------------------------------------------------
  // none,
};


// -- Export
export default { View };

/* eslint-enable one-var, semi-style, no-underscore-dangle */
