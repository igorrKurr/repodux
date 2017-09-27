'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
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

exports.default = request;