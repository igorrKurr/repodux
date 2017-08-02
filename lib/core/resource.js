'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Resource = undefined;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _reducer2 = require('./reducer');

var _selectors = require('./selectors');

var _actions = require('./actions');

var _sagas = require('./sagas');

var _reselect = require('reselect');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Resource = exports.Resource = function Resource() {
  var _this = this;

  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  (0, _classCallCheck3.default)(this, Resource);

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

  var reducer = (0, _defineProperty3.default)({}, this.name, (0, _reducer2.buildReducer)(this.types, this.id));
  this.reducer = reducer;

  var sagas = (0, _sagas.buildSagas)(this);

  this.sagas = sagas;

  (0, _keys2.default)(actions).forEach(function (action) {
    return _this[action] = actions[action];
  });
  (0, _keys2.default)(selectors).forEach(function (selector) {
    return _this[selector] = selectors[selector];
  });

  this.baseSelector = function (state) {
    return state[name];
  };

  this.select = function (f) {
    return (0, _reselect.createSelector)([baseSelector], f);
  };
};