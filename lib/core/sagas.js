'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildSagas = undefined;

var _upperFirst = require('lodash/upperFirst');

var _upperFirst2 = _interopRequireDefault(_upperFirst);

var _effects = require('redux-saga/effects');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createSagaPlaceholder = function createSagaPlaceholder(schema, actionName) {
  return function* (data) {
    console.warn('\n    Hey there! I\'m saga for yours app "' + schema.name + '" "' + actionName + '" hooks.\n    I\'ve just received some data.\n    Please make me do something meaningful with it:-)\n  ', data);
  };
};

var buildSagas = exports.buildSagas = function buildSagas(schema) {
  function* watchLoadFlow() {
    var flow = schema.onLoad ? schema.onLoad : createSagaPlaceholder(schema, 'onLoad');
    yield (0, _effects.takeLatest)(schema.types.load.tap, flow);
  }

  function* watchInsertFlow() {
    var flow = schema.onInsert ? schema.onInsert : createSagaPlaceholder(schema, 'onInsert');
    yield (0, _effects.takeLatest)(schema.types.insert.tap, flow);
  }

  function* watchUpdateFlow() {
    var flow = schema.onUpdate ? schema.onUpdate : createSagaPlaceholder(schema, 'onUpdate');
    yield (0, _effects.takeLatest)(schema.types.update.tap, flow);
  }

  function* watchDeleteFlow() {
    var flow = schema.onDelete ? schema.onDelete : createSagaPlaceholder(schema, 'onDelete');
    yield (0, _effects.takeLatest)(schema.types.delete.tap, flow);
  }

  function* watchInsertAllFlow() {
    var flow = schema.onInsertAll ? schema.onInsertAll : createSagaPlaceholder(schema, 'onInsertAll');
    yield (0, _effects.takeLatest)(schema.types.insertAll.tap, flow);
  }

  function* watchUpdateAllFlow() {
    var flow = schema.onUpdateAll ? schema.onUpdateAll : createSagaPlaceholder(schema, 'onUpdateAll');
    yield (0, _effects.takeLatest)(schema.types.updateAll.tap, flow);
  }

  function* watchDeleteAllFlow() {
    var flow = schema.onDeleteAll ? schema.onDeleteAll : createSagaPlaceholder(schema, 'onDeleteAll');
    yield (0, _effects.takeLatest)(schema.types.deleteAll.tap, flow);
  }

  return [watchLoadFlow, watchDeleteFlow, watchUpdateFlow, watchInsertFlow, watchDeleteAllFlow, watchUpdateAllFlow, watchInsertAllFlow];
};