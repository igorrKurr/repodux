'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

exports.HttpError = HttpError;
exports.NetworkError = NetworkError;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function HttpError(error, res) {
	// Object.assign(this, error);
	this.status = res.status;
	this.statusText = res.statusText;
	this.url = res.url;
	this.stack = new Error().stack.split('\n').slice(1).join('\n');
}
HttpError.prototype = (0, _create2.default)(Error.prototype);
HttpError.prototype.toString = function () {
	return this.status + ' ' + this.url + ' ' + this.message;
};

function NetworkError(error, url) {
	this.message = error.message;
	this.status = error.message;
	this.stack = error.stack.replace('TypeError', 'NetworkError');
	this.url = url;
}
NetworkError.prototype = (0, _create2.default)(Error.prototype);
NetworkError.prototype.toString = function () {
	return this.message + ' ' + this.url;
};