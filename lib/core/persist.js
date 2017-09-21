'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTransform = undefined;

var _reduxPersist = require('redux-persist');

var stateCleaner = function stateCleaner(state) {
  var items = state.items;
  return {
    items: items
  };
};

var createTransform = exports.createTransform = function createTransform(models) {
  return (0, _reduxPersist.createTransform)(
  //inbound
  stateCleaner,
  //outbound
  function (state) {
    return state;
  }, {
    whitelist: models
  });
};