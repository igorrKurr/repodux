'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildSelectors = undefined;

var _reselect = require('reselect');

var buildSelectors = exports.buildSelectors = function buildSelectors(schema) {
  var schemaSelector = function schemaSelector(state) {
    return state[schema];
  };

  var itemsSelector = (0, _reselect.createSelector)([schemaSelector], function (state) {
    return state.items;
  });

  var itemsArraySelector = (0, _reselect.createSelector)([itemsSelector], function (items) {
    return Object.values(items);
  });

  var allSelector = (0, _reselect.createSelector)([itemsArraySelector], function (items) {
    return items;
  });

  var countSelector = (0, _reselect.createSelector)([itemsArraySelector], function (items) {
    return items.length;
  });

  var statusSelector = (0, _reselect.createSelector)([schemaSelector], function (state) {
    return {
      inserting: state.inserting,
      deleting: state.deleting,
      loading: state.loading,
      updating: state.updating
    };
  });

  var errorSelector = (0, _reselect.createSelector)([schemaSelector], function (state) {
    return state.error;
  });

  return {
    base: schemaSelector,
    all: allSelector,
    index: itemsSelector,
    count: countSelector,
    status: statusSelector,
    error: errorSelector
  };
};