'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildOperationsWithStore = exports.buildOperations = exports.buildTypes = exports.operations = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _snakeCase = require('lodash/snakeCase');

var _snakeCase2 = _interopRequireDefault(_snakeCase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var actions = ['tap', 'success', 'failure', 'optimistic', 'revertOptimistic'];
var operations = exports.operations = ['load', 'update', 'updateAll', 'delete', 'deleteAll', 'insert', 'insertAll'];

var actionName = function actionName(action) {
  return (0, _snakeCase2.default)(action);
};

var actionType = function actionType(operation, action, schema) {
  return ('REPO/' + (0, _snakeCase2.default)(schema.name) + '/' + (0, _snakeCase2.default)(operation) + '/' + (0, _snakeCase2.default)(action)).toUpperCase();
};

var build = function build(typeBuilder) {
  return function (schema) {
    return operations.reduce(function (acc, operation) {
      return _extends({}, acc, _defineProperty({}, operation, actions.reduce(function (acc1, action) {
        return _extends({}, acc1, _defineProperty({}, action, typeBuilder(actionType(operation, action, schema))));
      }, {})));
    }, {});
  };
};

var buildTypes = exports.buildTypes = build(function (type) {
  return type;
});
var buildOperations = exports.buildOperations = build(function (type) {
  return function (payload) {
    return { type: type, payload: payload };
  };
});
var buildOperationsWithStore = exports.buildOperationsWithStore = function buildOperationsWithStore(store) {
  return build(function (type) {
    return function (payload) {
      return store.dispatch({ type: type, payload: payload });
    };
  });
};
//# sourceMappingURL=actions.js.map