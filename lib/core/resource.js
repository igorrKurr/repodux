'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Resource = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reselect = require('reselect');

var _reducer2 = require('./reducer');

var _selectors = require('./selectors');

var _actions = require('./actions');

var _sagas = require('./sagas');

var _connect = require('./connect');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var isSelector = function isSelector(f) {
  return f.toString() === (0, _reselect.defaultMemoize)().toString();
};

function proxify(obj) {
  var handler = {
    set: function set(target, prop, value) {
      if (isSelector(value)) {
        target.selectors[prop] = value;
      }

      target[prop] = value;
      return true;
    }
  };

  return new Proxy(obj, handler);
}

var Resource = exports.Resource = function Resource() {
  var _this = this;

  _classCallCheck(this, Resource);

  this.normalize = function (data) {
    return (0, _reducer2.prepareData)(_this.id, data);
  };

  var idProp = this.id || 'id';
  this.id = idProp;

  var name = this.name || this.constructor.name;
  this.name = name.toLowerCase();

  var baseTypes = (0, _actions.buildTypes)(this.name);
  var errorTypes = (0, _actions.buildEventTypes)(['error:clear'], this.name);
  var types = _extends({}, baseTypes, errorTypes);

  var operations = (0, _actions.buildOperations)(this.name);
  var errorOperations = (0, _actions.buildEventActions)(['error:clear'], this.name);
  var actions = _extends({}, operations, errorOperations);

  var selectors = (0, _selectors.buildSelectors)(this.name);

  this.types = types;
  this.actions = actions;
  this.selectors = selectors;

  var reducer = _defineProperty({}, this.name, (0, _reducer2.buildReducer)(this.types, this.id));
  this.reducer = reducer;

  var sagas = (0, _sagas.buildSagas)(this);

  this.sagas = sagas;

  Object.keys(actions).forEach(function (action) {
    return _this[action] = actions[action];
  });
  Object.keys(selectors).forEach(function (selector) {
    return _this[selector] = selectors[selector];
  });

  var baseSelector = function baseSelector(state) {
    return state[_this.name];
  };

  this.select = function (f) {
    return (0, _reselect.createSelector)([baseSelector], f);
  };

  this.link = function (s, f) {
    return (0, _reselect.createSelector)(s, f);
  };

  this.connect = (0, _connect.connect)(this);

  return proxify(this);
};