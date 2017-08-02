'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildStore = exports.clearStore = exports.storePersist = exports.rehydratedSelector = exports.INITIAL_STATE = undefined;
exports.storeReducer = storeReducer;

var _redux = require('redux');

var _reduxPersist = require('redux-persist');

var _reduxSaga = require('redux-saga');

var _reduxSaga2 = _interopRequireDefault(_reduxSaga);

var _reduxLogger = require('redux-logger');

var _reduxLogger2 = _interopRequireDefault(_reduxLogger);

var _effects = require('redux-saga/effects');

var _localforage = require('localforage');

var _localforage2 = _interopRequireDefault(_localforage);

var _seamlessImmutable = require('seamless-immutable');

var _seamlessImmutable2 = _interopRequireDefault(_seamlessImmutable);

var _constants = require('redux-persist/constants');

var _reselect = require('reselect');

var _immutable = require('../utils/immutable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var INITIAL_STATE = exports.INITIAL_STATE = (0, _seamlessImmutable2.default)({
  isRehydrated: false
});

var ACTION_HANDLERS = _defineProperty({}, _constants.REHYDRATE, function (state, _ref) {
  var payload = _ref.payload;

  return state.set('isRehydrated', true);
});

function storeReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE;
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}

var rehydrationSeletor = function rehydrationSeletor(state) {
  return state.rehydration;
};

var rehydratedSelector = exports.rehydratedSelector = (0, _reselect.createSelector)([rehydrationSeletor], function (rehydration) {
  return rehydration.isRehydrated;
});

var config = {
  storage: _localforage2.default,
  transforms: [_immutable.immutableTransform],
  blacklist: ['rehydration']
};

var storePersist = exports.storePersist = function storePersist(store) {
  return new Promise(function (resolve, reject) {
    (0, _reduxPersist.persistStore)(store, config, function (err, state) {
      if (err) {
        reject(err);
      } else {
        resolve(state);
      }
    });
  });
};

var clearStore = exports.clearStore = function clearStore(store) {
  return (0, _reduxPersist.persistStore)(store, config).purge;
};

var buildStore = exports.buildStore = function buildStore(resources) {
  var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref2$logger = _ref2.logger,
      logger = _ref2$logger === undefined ? false : _ref2$logger,
      _ref2$persist = _ref2.persist,
      persist = _ref2$persist === undefined ? true : _ref2$persist;

  if (!resources || resources.length === 0) {
    throw "Passing empty resources is not allowed";
  }

  var sagaMiddleware = (0, _reduxSaga2.default)();

  var reducers = resources.map(function (r) {
    return r.reducer;
  });
  var sagas = resources.map(function (r) {
    return r.sagas;
  });

  var rootReducer = (0, _redux.combineReducers)(Object.assign.apply(Object, [{}, storeReducer].concat(_toConsumableArray(reducers))));
  var rootSaga = regeneratorRuntime.mark(function root() {
    var _Array$prototype;

    return regeneratorRuntime.wrap(function root$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _effects.all)((_Array$prototype = Array.prototype).concat.apply(_Array$prototype, _toConsumableArray(sagas)).map(_effects.fork));

          case 2:
          case 'end':
            return _context.stop();
        }
      }
    }, root, this);
  });

  var middleware = [];
  middleware.push(sagaMiddleware);

  if (logger) {
    var _logger = (0, _reduxLogger2.default)({});
    middleware.push(_logger);
  }

  var enhancers = persist ? (0, _redux.compose)(_redux.applyMiddleware.apply(undefined, middleware), (0, _reduxPersist.autoRehydrate)()) : (0, _redux.compose)(_redux.applyMiddleware.apply(undefined, middleware));

  var store = (0, _redux.createStore)(rootReducer, enhancers);

  sagaMiddleware.run(rootSaga);

  store.close = function () {
    return store.dispatch(_reduxSaga.END);
  };

  store.persist = function () {
    return storePersist(store);
  };
  store.clear = function () {
    return clearStore(store);
  };

  store.isRehydrated = rehydratedSelector;

  return store;
};