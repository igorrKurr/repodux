'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authRequest = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.request = request;

var _errors = require('./errors');

var _effects = require('redux-saga/effects');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TIMEOUT_TIME = 5000;
var ERROR_MESSAGE = 'Request Timeout';

function parseJSON(response) {
  return response.text().then(function (text) {
    return text ? JSON.parse(text) : null;
  });
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  throw new _errors.HttpError(response.statusText, response);
}

var timeoutPromise = function timeoutPromise(ms) {
  return function (promise) {
    return new _promise2.default(function (resolve, reject) {
      var timeoutId = setTimeout(function () {
        reject(new Error(ERROR_MESSAGE));
      }, ms);
      promise.then(function (res) {
        clearTimeout(timeoutId);
        resolve(res);
      }, function (err) {
        clearTimeout(timeoutId);
        reject(err);
      });
    });
  };
};

var timeout = timeoutPromise(TIMEOUT_TIME);

function request(url, options) {
  return timeout(fetch(url, options)).then(checkStatus).then(parseJSON).then(function (data) {
    return data;
  }).catch(function (err) {
    var error = err instanceof _errors.HttpError ? err : new _errors.NetworkError(err, url);
    throw error;
  });
}

var authRequest = exports.authRequest = _regenerator2.default.mark(function authRequest(url, options) {
  var token, headers;
  return _regenerator2.default.wrap(function authRequest$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _effects.select)(function (state) {
            return state.auth.token;
          });

        case 2:
          token = _context.sent;
          headers = {
            'Authorization': 'Bearer ' + token
          };

          if (options && ['PUT', 'POST', 'DELETE'].includes(options.method)) {
            headers['Content-Type'] = 'application/json';
          }

          _context.next = 7;
          return (0, _effects.call)(request, url, (0, _extends3.default)({}, options, {
            headers: headers
          }));

        case 7:
          return _context.abrupt('return', _context.sent);

        case 8:
        case 'end':
          return _context.stop();
      }
    }
  }, authRequest, this);
});

exports.default = request;