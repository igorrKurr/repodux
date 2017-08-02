'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authRequest = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.request = request;

var _errors = require('./errors');

var _effects = require('redux-saga/effects');

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
    return new Promise(function (resolve, reject) {
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

var authRequest = exports.authRequest = regeneratorRuntime.mark(function authRequest(url, options) {
  var token, headers;
  return regeneratorRuntime.wrap(function authRequest$(_context) {
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
          return (0, _effects.call)(request, url, _extends({}, options, {
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