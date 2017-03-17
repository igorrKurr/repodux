'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSchema = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _inflection = require('inflection');

var _actions = require('./actions');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var buildUrl = function buildUrl(apiUrl, opts) {
  return function (method) {
    return function (params) {
      var resource = (0, _inflection.pluralize)(opts.name);
      var id = opts.id;
      if (method === 'insert') {
        return apiUrl + '/' + resource;
      } else if (method === 'delete') {
        return apiUrl + '/' + resource + '/' + params[id];
      } else if (method === 'update') {
        return apiUrl + '/' + resource + '/' + params[id];
      } else if (method === 'load') {
        return apiUrl + '/' + resource;
      } else {
        return apiUrl + '/' + resource;
      }
    };
  };
};

var identity = function identity(x) {
  return x;
};

var buildChangeset = function buildChangeset(opts) {
  return function (schema) {
    return identity;
  };
};

var createSchema = exports.createSchema = function createSchema(opts) {
  var apiUrl = opts.apiUrl;
  var name = opts.name;
  var id = opts.id;
  if (!apiUrl) {
    throw 'Api url is reqired';
  }
  if (!name) {
    throw 'Name is reqired';
  }
  if (!id) {
    throw 'ID is reqired';
  }
  var urlBuilder = buildUrl(apiUrl, name);
  var changesetBuilder = buildChangeset(opts);

  var urls = _actions.operations.reduce(function (acc, operation) {
    return _extends({}, acc, _defineProperty({}, operation, urlBuilder(operation)));
  }, {});

  var changeset = _actions.operations.reduce(function (acc, operation) {
    return _extends({}, acc, _defineProperty({}, operation, changesetBuilder(operation)));
  }, {});

  return _extends({
    urls: urls,
    changeset: changeset
  }, opts);
};
//# sourceMappingURL=schema.js.map