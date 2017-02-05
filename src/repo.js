import { combineReducers } from 'redux';
import { fork } from 'redux-saga/effects';

import { buildOperations, buildTypes, buildOperationsWithStore } from './actions';
import { buildSagaFor } from './sagas';
import { buildReducerFor } from './reducer';
import { buildSelectors } from './selectors';
import { createStore } from './createStore';

const createRepo = (schemas) => {
  const reducersAndSagas = schemas.reduce((acc, schema) => {
    const operations = buildOperations(schema)
    const types = buildTypes(schema)

    return {
      ...acc,
      reducers: {
        ...acc.reducers,
        [schema.name]: buildReducerFor(types, schema)
      },
      sagas: [
        ...acc.sagas,
        ...buildSagasFor(types, operations, schema)
      ]
    }
  }, {})

  const rootReducer = combineReducers(reducersAndSagas.reducers)
  const rootSaga = function * () {
    yield reducersAndSagas.sagas.map(fork)
  }

  const store = createStore(rootReducer, rootSaga)
  const buildRepoOperations = buildOperationsWithStore(store)

  const repoOperations = schemas.reduce((acc, schema) => {
    const operations = buildRepoOperations(schema)
    const selectors = buildSelectors(schema)
    return {
      ...acc,
      [schema.name]: {
        ...operations,
        ...selectors
      }
    }
  }, {})

  return {
    __store__: store,
    ...repoOperations,
    update: (schema, changes) => repoOperations[schema.name].update.tap(changes),
    updateAll: (schema, changes) => repoOperations[schema.name].updateAll.tap(changes),
    delete: (schema, changes) => repoOperations[schema.name].delete.tap(changes),
    deleteAll: (schema, changes) => repoOperations[schema.name].deleteAll.tap(changes),
    insert: (schema, changes) => repoOperations[schema.name].insert.tap(changes),
    insertAll: (schema, changes) => repoOperations[schema.name].insertAll.tap(changes),
    load: (schema, changes) => repoOperations[schema.name].load.tap(changes),

    getById: (schema) => repoOperations[schema.name].getById(),
    all: (schema) => repoOperations[schema.name].all(),
  }
}
