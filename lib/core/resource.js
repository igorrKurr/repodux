'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Resource = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reselect = require('reselect');

var _isFunction = require('lodash/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _reducer2 = require('./reducer');

var _selectors = require('./selectors');

var _actions = require('./actions');

var _sagas = require('./sagas');

var _connect = require('./connect');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var isSelector = function isSelector(f) {
  return (0, _isFunction2.default)(f) && f.toString() === (0, _reselect.defaultMemoize)().toString();
};
var isGenerator = function isGenerator(f) {
  return (0, _isFunction2.default)(f) && f.constructor.toString() === regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }).constructor.toString();
};

function proxify(obj) {
  var handler = {
    set: function set(target, prop, value) {
      if (isSelector(value)) {
        target.selectors[prop] = value;
      }

      if (isGenerator(value)) {
        target[prop] = value.bind(target);
      } else {
        target[prop] = value;
      }

      return true;
    }
  };

  return new Proxy(obj, handler);
}

var Resource = exports.Resource = function Resource() {
  var _this = this;

  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  _classCallCheck(this, Resource);

  this.normalize = function (data) {
    return (0, _reducer2.prepareData)(_this.id, data);
  };

  var idProp = config.id || 'id';
  this.id = idProp;

  var name = config.name || this.constructor.name;
  this.name = name.toLowerCase();

  var immutable = this.immutable;

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

  var reducer = _defineProperty({}, this.name, (0, _reducer2.buildReducer)(this.types, this.id, { immutable: immutable }));
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