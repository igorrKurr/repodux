'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Resource = undefined;

var _reducer2 = require('./reducer');

var _selectors = require('./selectors');

var _actions = require('./actions');

var _sagas = require('./sagas');

var _reselect = require('reselect');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Resource = exports.Resource = function Resource() {
  var _this = this;

  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  _classCallCheck(this, Resource);

  this.normalize = function (data) {
    return (0, _reducer2.prepareData)(_this.id, data);
  };

  var idProp = config.id || this.id || 'id';
  this.id = idProp;

  var name = config.name || this.name || this.constructor.name;
  this.name = name;

  var types = (0, _actions.buildTypes)(this.name);
  var actions = (0, _actions.buildOperations)(this.name);
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

  this.baseSelector = function (state) {
    return state[name];
  };

  this.select = function (f) {
    return (0, _reselect.createSelector)([baseSelector], f);
  };
};