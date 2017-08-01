import { createStore, applyMiddleware, compose } from 'redux';
import { autoRehydrate } from 'redux-persist';
import createSagaMiddleware, { END } from 'redux-saga';
import { combineReducers } from 'redux';
import createLogger from 'redux-logger';
import { fork, all } from 'redux-saga/effects';
import localForage from 'localforage';
import { persistStore } from 'redux-persist';
import Immutable from 'seamless-immutable';
import {REHYDRATE} from 'redux-persist/constants';
import { createSelector } from 'reselect';

import immutableTransform from '../utils/immutable';

export const INITIAL_STATE = Immutable({
  isRehydrated: false
});

const ACTION_HANDLERS = {
  [REHYDRATE]: (state, { payload }) => {
    return state.set('isRehydrated', true);
  },
}

export function storeReducer (state = INITIAL_STATE, action = {}) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}

const rehydrationSeletor = state => state.rehydration

export const rehydratedSelector = createSelector(
  [rehydrationSeletor],
  (rehydration) => rehydration.isRehydrated
)

const config = {
  storage: localForage,
  transforms: [immutableTransform],
  blacklist: ['rehydration']
}

export const storePersist = (store) => {
  return new Promise((resolve, reject) => {
    persistStore(store, config, (err, state) => {
      if (err) {
        reject(err)
      } else {
        resolve(state)
      }
    });
  })
}

export const clearStore = (store) => persistStore(store, config).purge;

export default (resources, { logger = false, persist = true }) => {
  if (!resources || resources.length === 0) {
    throw "Passing empty resources is not allowed"
  }

  const sagaMiddleware = createSagaMiddleware();

  const reducers = resources.map(r => r.reducer)
  const sagas = resources.map(r => r.sagas)

  const rootReducer = combineReducers(Object.assign(...[{}, storeReducer, ...reducers]))
  const rootSaga = function * root () {
    yield all(Array.prototype.concat(...sagas).map(fork))
  }

  const middleware = [];
  middleware.push(sagaMiddleware);

  if (logger) {
    const logger = createLogger({});
    middleware.push(logger);
  }

  const enhancers = persist ? compose(
    applyMiddleware(...middleware),
    autoRehydrate()
  ) : compose(applyMiddleware(...middleware)) 

  const store = createStore(
    rootReducer,
    enhancers
  );

  sagaMiddleware.run(rootSaga);

  store.close = () => store.dispatch(END)

  store.persist = () => storePersist(store)
  store.clear = () => clearStore(store)

  store.isRehydrated = rehydratedSelector

  return store;
}
