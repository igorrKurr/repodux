'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRepo = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _redux = require('redux');

var _effects = require('redux-saga/effects');

var _actions = require('./actions');

var _sagas = require('./sagas');

var _reducer = require('./reducer');

var _selectors = require('./selectors');

var _store = require('./store');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var createRepo = exports.createRepo = function createRepo(schemas) {
  var reducersAndSagas = schemas.reduce(function (acc, schema) {
    var operations = (0, _actions.buildOperations)(schema);
    var types = (0, _actions.buildTypes)(schema);

    return _extends({}, acc, {
      reducers: _extends({}, acc.reducers, _defineProperty({}, schema.name, (0, _reducer.buildReducerFor)(types, schema))),
      sagas: [].concat(_toConsumableArray(acc.sagas), _toConsumableArray(buildSagasFor(types, operations, schema)))
    });
  }, {});

  var rootReducer = (0, _redux.combineReducers)(reducersAndSagas.reducers);
  var rootSaga = regeneratorRuntime.mark(function rootSaga() {
    return regeneratorRuntime.wrap(function rootSaga$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return reducersAndSagas.sagas.map(_effects.fork);

          case 2:
          case 'end':
            return _context.stop();
        }
      }
    }, rootSaga, this);
  });

  var store = (0, _store.configureStore)(rootReducer, rootSaga);
  var buildRepoOperations = (0, _actions.buildOperationsWithStore)(store);

  var repoOperations = schemas.reduce(function (acc, schema) {
    var operations = buildRepoOperations(schema);
    var selectors = (0, _selectors.buildSelectors)(schema);
    return _extends({}, acc, _defineProperty({}, schema.name, _extends({}, operations, selectors)));
  }, {});

  return _extends({
    __store__: store
  }, repoOperations, {
    update: function update(schema, changes) {
      return repoOperations[schema.name].update.tap(changes);
    },
    updateAll: function updateAll(schema, changes) {
      return repoOperations[schema.name].updateAll.tap(changes);
    },
    delete: function _delete(schema, changes) {
      return repoOperations[schema.name].delete.tap(changes);
    },
    deleteAll: function deleteAll(schema, changes) {
      return repoOperations[schema.name].deleteAll.tap(changes);
    },
    insert: function insert(schema, changes) {
      return repoOperations[schema.name].insert.tap(changes);
    },
    insertAll: function insertAll(schema, changes) {
      return repoOperations[schema.name].insertAll.tap(changes);
    },
    load: function load(schema, changes) {
      return repoOperations[schema.name].load.tap(changes);
    },

    getById: function getById(schema) {
      return repoOperations[schema.name].getById();
    },
    all: function all(schema) {
      return repoOperations[schema.name].all();
    }
  });
};
//# sourceMappingURL=repo.js.map