'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildSelectors = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reselect = require('reselect');

var _sortBy = require('lodash/sortBy');

var _sortBy2 = _interopRequireDefault(_sortBy);

var _isArray = require('lodash/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

var _isString = require('lodash/isString');

var _isString2 = _interopRequireDefault(_isString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

  var allSelector = function allSelector(query) {
    return (0, _reselect.createSelector)([itemsArraySelector], function (items) {
      try {
        if (!query) {
          return items;
        }
        var results = items;
        var where = query.where;
        var orderBy = query.orderBy;
        var fields = query.fields;
        if (where) {
          results = items.filter(where);
        }
        if (orderBy) {
          results = (0, _sortBy2.default)(results, orderBy[0]);
          if (orderBy[1] === 'desc') {
            results.reverse();
          }
        }
        if (fields) {
          results = results.map(function (item) {
            var result = fields.reduce(function (acc, field) {
              var part = void 0;
              if (field === '*') {
                part = item;
              } else if ((0, _isArray2.default)(field)) {
                part = _defineProperty({}, field[0], field[1](item));
              } else if ((0, _isString2.default)(part)) {
                part = _defineProperty({}, field, item[field]);
              } else {
                part = {};
              }
              return _extends({}, acc, part);
            }, {});
            return result;
          });
        }
        return results;
      } catch (err) {
        console.log(schema + ' all exeception', err);
        return items;
      }
    });
  };

  var countSelector = (0, _reselect.createSelector)([itemsArraySelector], function (items) {
    return items.length;
  });

  var getByIdSelector = function getByIdSelector(id) {
    return (0, _reselect.createSelector)([itemsSelector], function (items) {
      return items[id];
    });
  };

  var statusSelector = (0, _reselect.createSelector)([schemaSelector], function (state) {
    return {
      inserting: state.inserting,
      deleting: state.deleting,
      loading: state.loading,
      updating: state.updating
    };
  });

  return {
    all: allSelector,
    index: function index() {
      return itemsSelector;
    },
    count: function count() {
      return countSelector;
    },
    getById: getByIdSelector,
    status: function status() {
      return statusSelector;
    }
  };
};