/** ************************************************************************
 *
 * Implements a few utility primitives.
 *
 * util.js is just a literal object that contains a set of functions. It
 * can't be intantiated.
 *
 * Private Functions:
 *  . _getArgs                    decodes the fetch arguments,
 *  . _add                        adds a model to the collection,
 *  . _rm                         removes one model from the collection,
 *  . _remove                     removes model(s) from the collection,
 *  . _fetch                      retrieves new models from the server,
 *
 *
 * Public Static Methods:
 *  . add                         adds model(s) to the collection,
 *  . remove                      removes model(s) from the collection,
 *  . fetch                       retrieves new models from the server,
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
import _ from '../../../libs/_';
import F from '../../../sync/main';
import U from '../../../utils/util1';


// -- Local Constants


// -- Local Variables


// -- Private Functions ----------------------------------------------------

/**
 * Decodes the fetch arguments.
 *
 * @function ([arg1], [arg2])
 * @private
 * @param {Object}          the options,
 * @param {Function}        the function to call at the completion
 * @returns {Array}         returns an array with options, callback,
 * @since 0.0.0
 */
function _getArgs(...args) {
  const [arg1, arg2] = args;

  switch (args.length) {
    case 0:
      return [{}, null];

    case 1:
      if (_.isLiteralObject(arg1)) {
        return [arg1, null];
      }
      if (_.isFunction(arg1)) {
        return [{}, arg1];
      }
      return [{}, null];

    default:
      if (_.isLiteralObject(arg1) && _.isFunction(arg2)) {
        return [arg1, arg2];
      }
      if (_.isLiteralObject(arg1)) {
        return [arg1, null];
      }
      if (_.isFunction(arg1)) {
        return [{}, arg1];
      }
      return [{}, null];
  }
}

/**
 * Adds a model to the collection.
 *
 * Nota:
 * adds a model to the collection except if a model with the same
 * id already exist. Each time a model is added, the event 'add' is fired.
 * When all the models are added the event 'addcomplete' is fired.
 *
 * However, the 'add' method is used by 'fetch' to update the collection.
 * As, fetch doesn't want to fire 'add' and 'addcomplete' events, it uses
 * 'add' method with { silent: true } to prevent 'add' method firing events
 * in this case.
 *
 * @function (arg1, arg2, [arg3])
 * @private
 * @param {Object}          the collection object,
 * @param {Object/Array}    an object or an array of objects,
 * @param {Object}          options to disable firing events,
 * @returns {Array}         returns the added objects,
 * @since 0.0.0
 */
function _add(col, /* models */items, options) {
  const ids   = col._ids
      , cids  = col._cids
      , Model = col.model
      , out   = []
      ;

  let childs;
  if (_.isLiteralObject(items)) {
    childs = [items];
  } else if (_.isArray(items)) {
    childs = items;
  } else {
    childs = [];
  }

  let model
    , clomodel
    , id
    , mo
    , cm
    , attrs
    ;

  for (let i = 0; i < childs.length; i++) {
    if (_.isLiteralObject(childs[i])) {
      model = Model(childs[i], { parse: options && options.parse });
      id = model.$get('id');
      if (!ids.includes(id)) {
        if (id) {
          ids.push(id);
        }
        model.cid = `c${cids.length + 1}`;
        cids.push(model.cid);
        col._models.push(model);
        clomodel = _.clone(model);
        out.push(clomodel);
        if (!options || !options.silent) {
          col.$fire('add', clomodel);
        }
      } else {
        attrs = Object.keys(model.$getAll());
        mo = col.$get(model.$get('id'));
        for (let j = 0; j < attrs.length; j++) {
          mo._attributes[attrs[j]] = model._attributes[attrs[j]];
        }
        cm = _.clone(mo);
        out.push(cm);
        if (!options || !options.silent) col.$fire('add', cm);
      }
    }
  }

  if (!options || !options.silent) col.$fire('addcomplete', out);
  return out;
}

/**
 * Removes one model from the collection.
 *
 * @function (arg1, arg2, arg3, arg4)
 * @private
 * @param {Array}           the collection of models,
 * @param {String/Number}   the cid/id of the model to remove,
 * @param {Array}           the array of cids,
 * @param {Array}           the array of ids,
 * @returns {Object}        returns the removed model,
 * @since 0.0.0
 */
function _rm(models, id, cids, ids) {
  if (cids.indexOf(id) === -1 && ids.indexOf(id) === -1) return null;

  for (let i = 0; i < models.length; i++) {
    if (models[i].cid === id || models[i].$get('id') === id) {
      let index = cids.indexOf(models[i].cid);
      if (index > -1) cids.splice(index, 1);
      index = ids.indexOf(id);
      if (index > -1) ids.splice(index, 1);
      return models.splice(i, 1)[0];
    }
  }
  return null;
}

/**
 * Removes model(s) from the collection.
 *
 * Nota:
 * It removes a model or a set of models from a collection but not from
 * the server. It fires the 'remove' event for each model removed and an
 * 'removecomplete' afterwards. Firing could be disabled with the option
 * { silent: true }.
 * if you want to remove the model from the server too, you need to call
 * the model's 'delete' method.
 *
 * @function (arg1, arg2, [arg3])
 * @private
 * @param {Object}          the collection object,
 * @param {...}             an cid/id/model or an array of cid/id/model,
 * @param {Object}          options to disable firing events,
 * @returns {Array}         returns the removed models,
 * @since 0.0.0
 */
function _remove(col, models, options) {
  let nmodels;
  if (_.isLiteralObject(models) || _.isString(models) || _.isNumber(models)) {
    nmodels = [models];
  } else if (_.isArray(models)) {
    nmodels = models;
  } else {
    nmodels = [];
  }

  const out = [];
  for (let i = 0; i < nmodels.length; i++) {
    let m;
    if (_.isLiteralObject(nmodels[i])) {
      m = _rm(col._models, nmodels[i].cid, col._cids, col._ids);
    } else if (_.isString(nmodels[i]) || _.isNumber(nmodels[i])) {
      m = _rm(col._models, nmodels[i], col._cids, col._ids);
    }
    if (m) {
      out.push(m);
      if (!options || !options.silent) col.$fire('remove', m);
    }
  }
  if (!options || !options.silent) col.$fire('removecomplete', out);
  return out;
}

/**
 * Retrieves new models from the server.
 *
 * Nota:
 * The retrieved new collection is appended to the current collection.
 * If you want a fresh new collection, you must empty the previous
 * one first.
 *
 * @function (arg1, [arg2], [arg3])
 * @private
 * @param {Object}          the collection object,
 * @param {Object}          the collection object,
 * @param {Object}          the query parameters,
 * @param {Function}        the function to call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function _fetch(col, ...args) {
  const [options, callback] = _getArgs(...args)
      , nurl                = U.getUrl(col.url, options)
      ;

  const opts = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  const type = options.type === 'text' ? 'text' : 'json';
  F.fetch(nurl, opts, type, (err, data) => {
    if (err) {
      if (callback) callback(err);
      return;
    }
    const out = col.$add(data, { silent: true, parse: options.parse });
    if (!options.silent) col.$fire('load', out);
    if (callback) {
      callback(null, out);
    }
  });
}


// -- Public Static Methods ------------------------------------------------

const Util = {

  /**
   * Adds a model to the collection.
   *
   * @method (arg1, arg2, [arg3])
   * @public
   * @param {Object}          the collection object,
   * @param {Object/Array}    an object or an array of objects,
   * @param {Object}          options to disable firing events,
   * @returns {Array}         returns the added objects,
   * @since 0.0.0
   */
  add(col, models, options) {
    return _add(col, models, options);
  },

  /**
   * Removes model(s) from the collection.
   *
   * @method (arg1, arg2, [arg3])
   * @public
   * @param {Object}          the collection object,
   * @param {...}             an cid/id/model or an array of cid/id/model,
   * @param {Object}          options to disable firing events,
   * @returns {Array}         returns the removed models,
   * @since 0.0.0
   */
  remove(col, models, options) {
    return _remove(col, models, options);
  },

  /**
   * Retrieves new models from the server.
   *
   * @method (arg1, [arg2], [arg3])
   * @public
   * @param {Object}        the collection object,
   * @param {Object}        the query parameters,
   * @param {Function}      the function to call at the completion,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  fetch(col, ...args) {
    _fetch(col, ...args);
    return this;
  },
};


// -- Export
export default Util;

/* eslint-enable one-var, semi-style, no-underscore-dangle */
