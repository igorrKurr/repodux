import flatten from 'lodash/flatten'
import { put, call, takeLatest, fork } from 'redux-saga/effects';

export const buildSagasFor = (types, operations, schema) => {
  const urls = schema.urls

  function * loadFlow(data) {
    try {
      const http = schema.auth.load ? authRequest : request;

      const response = yield call(http, urls.load(data));
      return yield put(operations.insertAll.success(schema.changeset.insertAll(response)));
    } catch (error) {
      return yield put(operations.insertAll.failure(schema.changeset.error(error)));
    }
  }

  function * watchLoadFlow() {
    yield takeLatest(operations.load.tap, loadFlow);
  }

  function * insertAllFlow(data) {
    try {
      const http = schema.auth.insertAll ? authRequest : request;

      const response = yield call(http, urls.insertAll(data), {
        method: 'POST',
        body: JSON.stringify(data),
      });
      yield put(operations.insertAll.success(schema.changeset.insertAll(response)));
    } catch (error) {
      yield put(operations.insertAll.failure(schema.changeset.error(error)));
    }
  }

  function * watchInsertAllFlow() {
    yield takeLatest(operations.insertAll.tap, insertAllFlow);
  }

  function * insertFlow(data) {
    try {
      const http = schema.auth.insert ? authRequest : request;

      const response = yield call(http, urls.insert(data), {
        method: 'POST',
        body: JSON.stringify(data),
      });
      yield put(operations.insert.success(schema.changeset.insert(response)));
    } catch (error) {
      yield put(operations.insert.failure(schema.changeset.error(error)));
    }
  }

  function * watchInsertFlow() {
    yield takeLatest(operations.insertAll.tap, insertFlow);
  }

  function * updateFlow(data) {
    try {
      const http = schema.auth.update ? authRequest : request;

      const response = yield call(http, urls.update(data), {
        method: 'PUT',
        body: JSON.stringify(data),
      });
      yield put(operations.update.success(schema.changeset.update(response)));
    } catch (error) {
      yield put(operations.update.failure(schema.changeset.error(error)));
    }
  }

  function * watchUpdateFlow() {
    yield takeLatest(operations.update.tap, updateFlow);
  }

  function * updateAllFlow(data) {
    try {
      const http = schema.auth.updateAll ? authRequest : request;

      const response = yield call(http, urls.updateAll(data), {
        method: 'PUT',
        body: JSON.stringify(data),
      });
      yield put(operations.updateAll.success(schema.changeset.updateAll(response)));
    } catch (error) {
      yield put(operations.updateAll.failure(schema.changeset.error(error)));
    }
  }

  function * watchUpdateAllFlow() {
    yield takeLatest(operations.updateAll.tap, updateAllFlow);
  }

  function * deleteFlow(data) {
    try {
      const http = schema.auth.delete ? authRequest : request;

      const response = yield call(http, urls.delete(data), {
        method: 'DELETE',
        body: JSON.stringify(data),
      });
      yield put(operations.delete.success(schema.changeset.delete(response)));
    } catch (error) {
      yield put(operations.delete.failure(schema.changeset.error(error)));
    }
  }

  function * watchDeleteFlow() {
    yield takeLatest(operations.delete.tap, deleteAllFlow);
  }

  function * deleteAllFlow(data) {
    try {
      const http = schema.auth.deleteAll ? authRequest : request;

      const response = yield call(http, urls.deleteAll(data), {
        method: 'DELETE',
        body: JSON.stringify(data),
      });
      yield put(operations.deleteAll.success(schema.changeset.deleteAll(response)));
    } catch (error) {
      yield put(operations.deleteAll.failure(schema.changeset.error(error)));
    }
  }

  function * watchDeleteAllFlow() {
    yield takeLatest(operations.deleteAll.tap, deleteAllFlow);
  }

  return [
    watchDeleteAllFlow,
    watchDeleteFlow,
    watchUpdateAllFlow,
    watchUpdateFlow,
    watchInsertFlow,
    watchInsertAllFlow,
    watchLoadFlow,
  ]
}
