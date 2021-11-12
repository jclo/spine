/** ************************************************************************
 *
 * Defines the Spine.history object.
 *
 * main.js is just a literal object that contains a set of functions. It
 * can't be intantiated.
 *
 * Private Functions:
 *  . none,
 *
 *
 * Public Static Methods:
 *  . start                       starts recording the route history,
 *  . stop                        stops recording the route history,
 *  . isHistoryRunning            returns the history state,
 *  . get                         returns the route in the history stack,
 *  . push                        pushes a route in the stack,
 *  . pop                         removes the latest entered route and returns it,
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


// -- Local Constants
const MAXSTACK = 25;


// -- Local Variables


// -- Public Static Methods ------------------------------------------------

const History = {

  // history stack
  _history: null,

  /**
   * Starts recording the route history.
   *
   * @method ()
   * @private
   * @param {}              -,
   * @throws {Object}       throws an error if the history is started twice,
   * @returns {Object}      return this,
   * @since 0.0.0
   */
  start() {
    if (!this._history) {
      this._history = [];
      return this;
    }
    throw new Error('Spine.history is already running!');
  },

  /**
   * Stops recording the route history.
   *
   * @method ()
   * @private
   * @param {}              -,
   * @returns {Object}      return this,
   * @since 0.0.0
   */
  stop() {
    this._history = null;
    return this;
  },

  /**
   * Returns the history state.
   *
   * @method ()
   * @private
   * @param {}              -,
   * @returns {Boolean}     return the history state,
   * @since 0.0.0
   */
  isHistoryRunning() {
    if (this._history) {
      return true;
    }
    return false;
  },

  /**
   * Returns the route in the history stack.
   *
   * Nota:
   * If no value is specified, it returns the latest entered value.
   *
   * @method (arg1)
   * @private
   * @param {Number}        the stack index starting from the latest entered,
   * @throws {Object}       throws an error if the history isn't started,
   * @returns {String}      return the requested route,
   * @since 0.0.0
   */
  get(index) {
    if (this._history) {
      let i = -1;
      if (index && typeof index === 'number' && index < 0) {
        i = this._history.length + index >= 0
          ? index
          : -this._history.length;
      }
      return this._history[this._history.length + i];
    }
    throw new Error('Spine.history is NOT running!');
  },

  /**
   * Pushes a route in the stack.
   *
   * Nota:
   * In a normal usage you should not use this method. The object route
   * fills the stack.
   *
   * @method (arg1)
   * @private
   * @param {String}        the route to record in the history stack,
   * @throws {Object}       throws an error if the history is started twice,
   * @returns {Object}      return this,
   * @since 0.0.0
   */
  push(route) {
    if (this._history) {
      if (route && typeof route === 'string') {
        this._history.push(route);
        if (this._history.length > MAXSTACK) {
          this._history.shift();
        }
      }
      return this;
    }
    throw new Error('Spine.history is NOT running!');
  },

  /**
   * Removes the latest entered route and returns it.
   *
   * Nota:
   * In a normal usage you should not use this method.
   *
   * @method ()
   * @private
   * @param {}              -,
   * @returns {String}      returns the latest entered route,
   * @since 0.0.0
   */
  pop() {
    if (this._history) {
      return this._history.pop();
    }
    throw new Error('Spine.history is NOT running!');
  },
};


// -- Export
export default History;

/* eslint-enable one-var, semi-style, no-underscore-dangle */
