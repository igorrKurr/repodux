import { takeLatest, delay, take } from 'redux-saga';
import { put, call, takeLatest } from 'redux-saga/effects';

export const buildSagas = (types, operations, schema) => {
  const urls = schema.urls

  function * loadFlow() {
    try {
      const http = schema.auth.load ? authRequest : request;

      const response = yield call(http, urls.load);
      return yield put(operations.insertAll.success(schema.insertAllChangeset(response)));
    } catch (error) {
      return yield put(operations.insertAll.failure(schema.errorChangeset(error)));
    }
  }

  function * watchLoadFlow() {
    yield takeLatest(operations.load.tap, loadFlow);
  }

  function * insertAllFlow(data) {
    try {
      const http = schema.auth.insertAll ? authRequest : request;

      const response = yield call(http, urls.insertAll, {
        method: 'POST',
        body: JSON.stringify(data),
      });
      yield put(operations.insertAll.success(schema.insertAllChangeset(response)));
    } catch (error) {
      yield put(operations.insertAll.failure(schema.errorChangeset(error)));
    }
  }

  function * watchInsertAllFlow() {
    yield takeLatest(operations.insertAll.tap, insertAllFlow);
  }

  function * insertFlow(data) {
    try {
      const http = schema.auth.insert ? authRequest : request;

      const response = yield call(http, urls.insert, {
        method: 'POST',
        body: JSON.stringify(data),
      });
      yield put(operations.insert.success(schema.insertChangeset(response)));
    } catch (error) {
      yield put(operations.insert.failure(schema.errorChangeset(error)));
    }
  }

  function * watchInsertFlow() {
    yield takeLatest(operations.insertAll.tap, insertFlow);
  }

  function * updateFlow(data) {
    try {
      const http = schema.auth.update ? authRequest : request;

      const response = yield call(http, urls.update, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
      yield put(operations.update.success(schema.updateChangeset(response)));
    } catch (error) {
      yield put(operations.update.failure(schema.errorChangeset(error)));
    }
  }

  function * watchUpdateFlow() {
    yield takeLatest(operations.update.tap, updateFlow);
  }

  function * updateAllFlow(data) {
    try {
      const http = schema.auth.updateAll ? authRequest : request;

      const response = yield call(http, urls.updateAll, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
      yield put(operations.updateAll.success(schema.updateAllChangeset(response)));
    } catch (error) {
      yield put(operations.updateAll.failure(schema.errorChangeset(error)));
    }
  }

  function * watchUpdateAllFlow() {
    yield takeLatest(operations.updateAll.tap, updateAllFlow);
  }

  function * deleteFlow(data) {
    try {
      const http = schema.auth.delete ? authRequest : request;

      const response = yield call(http, urls.delete, {
        method: 'DELETE',
        body: JSON.stringify(data),
      });
      yield put(operations.delete.success(schema.deleteChangeset(response)));
    } catch (error) {
      yield put(operations.delete.failure(schema.errorChangeset(error)));
    }
  }

  function * watchDeleteFlow() {
    yield takeLatest(operations.delete.tap, deleteAllFlow);
  }

  function * deleteAllFlow(data) {
    try {
      const http = schema.auth.deleteAll ? authRequest : request;

      const response = yield call(http, urls.deleteAll, {
        method: 'DELETE',
        body: JSON.stringify(data),
      });
      yield put(operations.deleteAll.success(schema.deleteAllChangeset(response)));
    } catch (error) {
      yield put(operations.deleteAll.failure(schema.errorChangeset(error)));
    }
  }

  function * watchDeleteAllFlow() {
    yield takeLatest(operations.deleteAll.tap, deleteAllFlow);
  }
}
