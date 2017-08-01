import upperFirst from 'lodash/upperFirst'
import { put, call, takeLatest, fork } from 'redux-saga/effects';

const createSagaPlaceholder = (schema, actionName) => function * (data) {
  console.warn(`
    Hey there! I'm saga for yours app "${schema.name}" "${actionName}" hooks.
    I've just received some data.
    Please make me do something meaningful with it:-)
  `, data)
}

export const buildSagas = (schema) => {
  function * watchLoadFlow() {
    const flow = schema.onLoad ? schema.onLoad : createSagaPlaceholder(schema, 'onLoad')
    yield takeLatest(schema.types.load.tap, flow);
  }

  function * watchInsertFlow() {
    const flow = schema.onInsert ? schema.onInsert : createSagaPlaceholder(schema, 'onInsert')
    yield takeLatest(schema.types.insert.tap, flow);
  }

  function * watchUpdateFlow() {
    const flow = schema.onUpdate ? schema.onUpdate : createSagaPlaceholder(schema, 'onUpdate')
    yield takeLatest(schema.types.update.tap, flow);
  }

  function * watchDeleteFlow() {
    const flow = schema.onDelete ? schema.onDelete : createSagaPlaceholder(schema, 'onDelete')
    yield takeLatest(schema.types.delete.tap, flow);
  }

  function * watchInsertAllFlow() {
    const flow = schema.onInsertAll ? schema.onInsertAll : createSagaPlaceholder(schema, 'onInsertAll')
    yield takeLatest(schema.types.insertAll.tap, flow);
  }

  function * watchUpdateAllFlow() {
    const flow = schema.onUpdateAll ? schema.onUpdateAll : createSagaPlaceholder(schema, 'onUpdateAll')
    yield takeLatest(schema.types.updateAll.tap, flow);
  }

  function * watchDeleteAllFlow() {
    const flow = schema.onDeleteAll ? schema.onDeleteAll : createSagaPlaceholder(schema, 'onDeleteAll')
    yield takeLatest(schema.types.deleteAll.tap, flow);
  }

  return [
    watchLoadFlow,
    watchDeleteFlow,
    watchUpdateFlow,
    watchInsertFlow,
    watchDeleteAllFlow,
    watchUpdateAllFlow,
    watchInsertAllFlow,
  ]
}
