/** ************************************************************************
 *
 * Defines the Spine.radio object.
 *
 * main.js is just a literal object that contains a set of functions. It
 * can't be intantiated.
 *
 * Private Functions:
 *  . none,
 *
 *
 * Public Static Methods:
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


// -- Public Static Methods ------------------------------------------------

const Radio = {

  _mess: Messenger(),

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
   * @returns {Object}      returns this,
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
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  trigger(event, payload) {
    this.fire(event, payload);
    return this;
  },
};


// -- Export
export default Radio;

/* eslint-enable one-var, semi-style, no-underscore-dangle */
