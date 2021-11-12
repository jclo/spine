/** ************************************************************************
 *
 * Defines the Generic Spine object. All the Spine objects inherits from
 * this object.
 *
 * main.js is built upon the Prototypal Instantiation pattern. It
 * returns an object by calling its constructor. It doesn't use the new
 * keyword.
 *
 * Private Functions:
 *  . none,
 *
 *
 * Constructor:
 *  . Construct                   creates the Generic Spine object,
 *
 *
 * Private Methods:
 *  . _ginit                      makes the generic init when the object is created,
 *
 *
 * Overwritable Private Methods:
 *  . none,
 *
 *
 * Empty Private Methods:
 *  . _init                       makes init when the object is constructed,
 *
 *
 * Empty Public Methods:
 *  . none
 *
 *
 * Public Methods:
 *  . on                          listens for an event,
 *  . one                         listens for an event once,
 *  . off                         stops Listening the passed-in event,
 *  . fire                        fires an event,
 *  . trigger                     fires an event,
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
import Messenger from '@mobilabs/messenger';


// -- Local Modules


// -- Local Constants


// -- Local Variables


// -- Public ---------------------------------------------------------------

/**
 * Defines the Generic Component constructor.
 * (Prototypal Instantiation Pattern)
 *
 * @constructor (...args)
 * @public
 * @param {}                -,
 * @returns {}              -,
 * @since 0.0.0
 */
function Construct(...args) {
  this._ginit(...args);
  this._init(...args);
}


const methods = {

  // -- Private Methods ----------------------------------------------------

  /**
   * Makes the generic init when the object is constructed.
   * (private method - could not be overwritten)
   *
   * @method (...args)
   * @private
   * @param {}              -,
   * @returns {Object}      return this,
   * @since 0.0.0
   */
  _ginit() {
    this._mess = Messenger();
    return this;
  },


  // -- Empty Private Methods ----------------------------------------------

  /**
   * Makes initializations when the object is constructed.
   * (empty private method - could be overwritten)
   *
   * @method (...args)
   * @private
   * @param {}              -,
   * @returns {Object}      return this,
   * @since 0.0.0
   */
  _init() {
    return this;
  },


  // -- Overwritable Private Methods ---------------------------------------
  // none, (private method - could be overwritten)


  // -- Empty Public Methods -----------------------------------------------
  // none,


  // -- Public Methods -----------------------------------------------------

  /**
   * Listens for an event.
   *
   * @method (arg1, arg2)
   * @public
   * @param {String}        the message event,
   * @param {Function}      the function to call when the event occurs,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  on(event, handler) {
    this._mess.subscribe(event, handler);
    return this;
  },

  /**
   * Listens for an event once.
   *
   * @method (arg1, arg2)
   * @public
   * @param {String}        the message event,
   * @param {Function}      the function to call when the event occurs,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  one(event, handler) {
    this._mess.subscribeOnce(event, handler);
    return this;
  },

  /**
   * Stops Listening the passed-in event.
   *
   * @method (arg1, arg2)
   * @public
   * @param {String}        the message event,
   * @param {Function}      the handler to remove,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  off(event, handler) {
    this._mess.unsubscribe(event, handler);
    return this;
  },

  /**
   * Fires an event.
   *
   * @method (arg1, arg2)
   * @public
   * @param {String}        the message,
   * @param {Object}        the payload to send to the listeners,
   * @returns {Object}      returns this or null,
   * @since 0.0.0
   */
  fire(event, payload) {
    this._mess.publish(event, payload);
    return this;
  },

  /**
   * Fires an event.
   *
   * @method (arg1, arg2)
   * @public
   * @param {String}        the message,
   * @param {Object}        the payload to send to the listeners,
   * @returns {Object}      returns this or null,
   * @since 0.0.0
   */
  trigger(event, payload) {
    this.fire(event, payload);
    return this;
  },
};


// -- Export
export default { Construct, methods };

/* eslint-enable one-var, semi-style, no-underscore-dangle */
