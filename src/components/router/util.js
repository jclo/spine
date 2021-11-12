/** ************************************************************************
 *
 * Implements utility primitives.
 *
 * util.js is just a literal object that contains a set of functions. It
 * can't be intantiated.
 *
 * Private Functions:
 *  . _decodeQuery                decodes the query,
 *  . _decodeParams               decodes the params,
 *  . _route                      processes the routes,
 *
 *
 * Public Static Methods:
 *  . startListeningHashChange    starts the router,
 *  . stopListeningHashChange     stops the router,
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
import History from '../history/main';


// -- Local Constants


// -- Local Variables


// -- Private Functions ----------------------------------------------------

/**
 * Decodes the query.
 *
 * Nota:
 * Decodes the query from a simple route. For instance the route
 * 'page1/doc' and the url 'page1/doc/?id=1&qty=123' gives the params
 *  '{ id: 1, qty: 123 }'.
 *
 * @function (arg1, arg2)
 * @private
 * @param {Array}           the list of the defined routes,
 * @param {String}          the clicked url,
 * @returns {Array}         returns the matching route and the params,
 * @since 0.0.0
 */
function _decodeQuery(routes, url) {
  let route = url.slice(0, url.indexOf('?'));
  route = route.slice(-1) === '/' ? route.slice(0, -1) : route;

  if (routes[route]) {
    const query = {};
    url.slice(url.indexOf('?') + 1).split('&').forEach((item) => {
      const q = item.split('=');
      if (q.length === 2 && q[0].length > 0) {
        let value = q[1];
        if (/^\d+$/.test(value)) {
          value = parseInt(value, 10);
        }
        query[q[0]] = value;
      }
    });
    return [route, query];
  }

  return [null, null];
}

/**
 * Decodes the params.
 *
 * Nota:
 * Decodes params from a route defined with '/:'. For instance the route
 * 'page1/doc/:id/:qty' and the url 'page1/doc/1/123' gives the params
 *  '{ id: 1, qty: 123 }'.
 *
 * @function (arg1, arg2)
 * @private
 * @param {Array}           the list of the defined routes,
 * @param {String}          the clicked url,
 * @returns {Array}         returns the matching route and the params,
 * @since 0.0.0
 */
function _decodeParams(routes, url) {
  let route;
  let rpath;
  let match = false;

  const r = Object.keys(routes);
  for (let i = 0; i < r.length; i++) {
    if (r[i].includes('/:')) {
      rpath = r[i].split('/:');
      if (url.startsWith(`${rpath[0]}/`)) {
        route = r[i];
        match = true;
        break;
      }
    }
  }

  if (match) {
    // It matches, decode the params:
    // page3/doc/1/123
    //          |____| these are the params
    const [path] = rpath;
    const params = {};
    const values = url.slice(path.length + 1).split('/');
    for (let i = 1; i < rpath.length; i++) {
      let value = values[i - 1];
      if (/^\d+$/.test(value)) {
        value = parseInt(value, 10);
      }
      params[rpath[i]] = value;
    }
    return [route, params];
  }
  return [null, null];
}

/**
 * Processes the routes.
 *
 * Nota:
 * If this._replace is set to true, we won't store the hash change in the
 * history but only for once. When we turn it off. So, the caller must
 * turn this._replace true before changing the url.
 *
 * The philosophy is the same for this._trigger. By default, it is true. If
 * the caller doesn't want to trigger the route, it has to set false before.
 * And, when executed, this function turn it in the default state.
 *
 * @function ()
 * @private
 * @param {}                -,
 * @param {}                -,
 * @returns {}              -,
 * @since 0.0.0
 */
function _route() {
  /* eslint-disable-next-line no-restricted-globals */
  const url  = location.hash.slice(1);

  let route;
  let params;
  if (this.routes[url]) {
    route = url;
  } else {
    [route, params] = url.includes('?')
      ? _decodeQuery(this.routes, url)
      : _decodeParams(this.routes, url);
  }
  // If the route is unknown, we redirect to the 'home' page for
  // avoiding a blank page!
  route = typeof route === 'string' ? route : '';

  const fn = this[this.routes[route]];
  if (typeof fn !== 'function') {
    throw new Error(`Spine.Router: this direction "${fn}" does not match a function!`);
  }
  if (History.isHistoryRunning() && !this._replace) {
    History.push(url);
  }
  this._replace = false;

  if (this._trigger) {
    // fn.bind(this)();
    this.execute(fn, params, route, url);
  } else {
    this._trigger = true;
  }
}


// -- Public Static Methods ------------------------------------------------

const Util = {

  /**
   * Starts the router.
   *
   * @method (arg1)
   * @public
   * @param {Object}        the router object,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  startListeningHashChange(router) {
    this._route = _route.bind(router);
    // Listens on hash change and on page load:
    window.addEventListener('hashchange', this._route);
    window.addEventListener('load', this._route);
    return this;
  },

  /**
   * Stops the router.
   *
   * @method (arg1)
   * @public
   * @param {Object}        the router object,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  stopListeningHashChange() {
    window.removeEventListener('hashchange', this._route);
    window.removeEventListener('load', this._route);
    return this;
  },
};


// -- Export
export default Util;

/* eslint-enable one-var, semi-style, no-underscore-dangle */
