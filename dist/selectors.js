'use strict';

var _reselect = require('reselect');

var buildSelectors = function buildSelectors(schema) {
  var schemaSelector = function schemaSelector(state) {
    return state[schema.name];
  };

  var itemsSelector = (0, _reselect.createSelector)([schemaSelector], function (state) {
    return state.items;
  });

  var allSelector = function allSelector() {
    return (0, _reselect.createSelector)([itemsSelector], function (items) {
      return Object.values(items);
    });
  };

  var getByIdSelector = function getByIdSelector(id) {
    return (0, _reselect.createSelector)([itemsSelector], function (items) {
      return items[id];
    });
  };

  return {
    all: allSelector,
    getById: getByIdSelector
  };
};
//# sourceMappingURL=selectors.js.map