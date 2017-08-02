'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildEventActions = exports.buildEventTypes = exports.buildOperations = exports.buildTypes = exports.operations = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _snakeCase = require('lodash/snakeCase');

var _snakeCase2 = _interopRequireDefault(_snakeCase);

var _set = require('lodash/set');

var _set2 = _interopRequireDefault(_set);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var actions = ['tap', 'success', 'failure'];
var operations = exports.operations = ['load', 'update', 'updateAll', 'delete', 'deleteAll', 'insert', 'insertAll'];

var actionType = function actionType(operation, action, schema) {
  return ((0, _snakeCase2.default)(schema) + '/' + (0, _snakeCase2.default)(operation) + '/' + (0, _snakeCase2.default)(action)).toUpperCase();
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

var buildForEvents = function buildForEvents(func) {
  return function (events, schema) {
    return events.reduce(function (acc, event) {
      return _extends({}, acc, (0, _set2.default)(acc, event.replace(':', '.'), func(event, schema)));
    }, {});
  };
};

var buildTypeEventBase = function buildTypeEventBase(event) {
  return ('' + event.split(':').map(_snakeCase2.default).join('/')).toUpperCase();
};
var buildTypeEvent = function buildTypeEvent(event, schema) {
  return schema ? ((0, _snakeCase2.default)(schema) + '/' + buildTypeEventBase(event)).toUpperCase() : buildTypeEventBase(event);
};
var buildActionEvent = function buildActionEvent(event, schema) {
  return function (payload) {
    return {
      type: buildTypeEvent(event, schema),
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