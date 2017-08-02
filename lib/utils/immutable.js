'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.immutableTransform = undefined;

var _seamlessImmutable = require('seamless-immutable');

var _seamlessImmutable2 = _interopRequireDefault(_seamlessImmutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var immutableTransform = exports.immutableTransform = {
  out: function out(state) {
    return (0, _seamlessImmutable2.default)(state);
  },
  in: function _in(state) {
    return state.asMutable ? state.asMutable({ deep: true }) : state;
  }
};