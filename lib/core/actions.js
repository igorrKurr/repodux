'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildEventActions = exports.buildEventTypes = exports.buildOperations = exports.buildTypes = exports.operations = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends5 = require('babel-runtime/helpers/extends');

var _extends6 = _interopRequireDefault(_extends5);

var _snakeCase = require('lodash/snakeCase');

var _snakeCase2 = _interopRequireDefault(_snakeCase);

var _camelCase = require('lodash/camelCase');

var _camelCase2 = _interopRequireDefault(_camelCase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var actions = ['tap', 'success', 'failure'];
var operations = exports.operations = ['load', 'update', 'updateAll', 'delete', 'deleteAll', 'insert', 'insertAll'];

var actionType = function actionType(operation, action, schema) {
  return ((0, _snakeCase2.default)(schema) + '/' + (0, _snakeCase2.default)(operation) + '/' + (0, _snakeCase2.default)(action)).toUpperCase();
};

var build = function build(typeBuilder) {
  return function (schema) {
    return operations.reduce(function (acc, operation) {
      return (0, _extends6.default)({}, acc, (0, _defineProperty3.default)({}, operation, actions.reduce(function (acc1, action) {
        return (0, _extends6.default)({}, acc1, (0, _defineProperty3.default)({}, action, typeBuilder(actionType(operation, action, schema))));
      }, {})));
    }, {});
  };
};

var buildForEvents = function buildForEvents(func) {
  return function (events) {
    return events.reduce(function (acc, event) {
      return (0, _extends6.default)({}, acc, (0, _defineProperty3.default)({}, (0, _camelCase2.default)(event), func(event)));
    }, {});
  };
};

var buildTypeEvent = function buildTypeEvent(event) {
  return ('' + event.split(':').map(_snakeCase2.default).join('/')).toUpperCase();
};
var buildActionEvent = function buildActionEvent(event) {
  return function (payload) {
    return {
      type: buildTypeEvent(event),
      payload: payload
    };
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

var buildEventTypes = exports.buildEventTypes = buildForEvents(buildTypeEvent);
var buildEventActions = exports.buildEventActions = buildForEvents(buildActionEvent);