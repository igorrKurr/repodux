'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configureStore = undefined;

var _redux = require('redux');

var _reduxSaga = require('redux-saga');

var _reduxSaga2 = _interopRequireDefault(_reduxSaga);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var configureStore = exports.configureStore = function configureStore(reducers, sagas) {
  var sagaMiddleware = (0, _reduxSaga2.default)();

  var middleware = [sagaMiddleware];
  middleware.push(sagaMiddleware);

  var enhancers = (0, _redux.compose)(_redux.applyMiddleware.apply(undefined, middleware));

  var store = (0, _redux.createStore)(reducers, enhancers);

  sagaMiddleware.run(sagas);

  store.close = function () {
    return store.dispatch(_reduxSaga.END);
  };

  return store;
};
// import { autoRehydrate } from 'redux-persist';
//# sourceMappingURL=store.js.map