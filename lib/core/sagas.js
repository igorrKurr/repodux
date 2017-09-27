'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildSagas = undefined;

var _effects = require('redux-saga/effects');

var createSagaPlaceholder = function createSagaPlaceholder(schema, actionName) {
  return regeneratorRuntime.mark(function _callee(data) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.warn('\n    Hey there! I\'m saga for yours app "' + schema.name + '" "' + actionName + '" hooks.\n    I\'ve just received some data.\n    Please make me do something meaningful with it:-)\n  ', data);
            _context.next = 3;
            return false;

          case 3:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  });
};

var buildSagas = exports.buildSagas = function buildSagas(schema) {
  var _marked = [watchLoadFlow, watchInsertFlow, watchUpdateFlow, watchDeleteFlow, watchInsertAllFlow, watchUpdateAllFlow, watchDeleteAllFlow].map(regeneratorRuntime.mark);

  function watchLoadFlow() {
    var flow;
    return regeneratorRuntime.wrap(function watchLoadFlow$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            flow = schema.onLoad ? schema.onLoad : createSagaPlaceholder(schema, 'onLoad');
            _context2.next = 3;
            return (0, _effects.takeLatest)(schema.types.load.tap, flow);

          case 3:
          case 'end':
            return _context2.stop();
        }
      }
    }, _marked[0], this);
  }

  function watchInsertFlow() {
    var flow;
    return regeneratorRuntime.wrap(function watchInsertFlow$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            flow = schema.onInsert ? schema.onInsert : createSagaPlaceholder(schema, 'onInsert');
            _context3.next = 3;
            return (0, _effects.takeLatest)(schema.types.insert.tap, flow);

          case 3:
          case 'end':
            return _context3.stop();
        }
      }
    }, _marked[1], this);
  }

  function watchUpdateFlow() {
    var flow;
    return regeneratorRuntime.wrap(function watchUpdateFlow$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            flow = schema.onUpdate ? schema.onUpdate : createSagaPlaceholder(schema, 'onUpdate');
            _context4.next = 3;
            return (0, _effects.takeLatest)(schema.types.update.tap, flow);

          case 3:
          case 'end':
            return _context4.stop();
        }
      }
    }, _marked[2], this);
  }

  function watchDeleteFlow() {
    var flow;
    return regeneratorRuntime.wrap(function watchDeleteFlow$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            flow = schema.onDelete ? schema.onDelete : createSagaPlaceholder(schema, 'onDelete');
            _context5.next = 3;
            return (0, _effects.takeLatest)(schema.types.delete.tap, flow);

          case 3:
          case 'end':
            return _context5.stop();
        }
      }
    }, _marked[3], this);
  }

  function watchInsertAllFlow() {
    var flow;
    return regeneratorRuntime.wrap(function watchInsertAllFlow$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            flow = schema.onInsertAll ? schema.onInsertAll : createSagaPlaceholder(schema, 'onInsertAll');
            _context6.next = 3;
            return (0, _effects.takeLatest)(schema.types.insertAll.tap, flow);

          case 3:
          case 'end':
            return _context6.stop();
        }
      }
    }, _marked[4], this);
  }

  function watchUpdateAllFlow() {
    var flow;
    return regeneratorRuntime.wrap(function watchUpdateAllFlow$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            flow = schema.onUpdateAll ? schema.onUpdateAll : createSagaPlaceholder(schema, 'onUpdateAll');
            _context7.next = 3;
            return (0, _effects.takeLatest)(schema.types.updateAll.tap, flow);

          case 3:
          case 'end':
            return _context7.stop();
        }
      }
    }, _marked[5], this);
  }

  function watchDeleteAllFlow() {
    var flow;
    return regeneratorRuntime.wrap(function watchDeleteAllFlow$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            flow = schema.onDeleteAll ? schema.onDeleteAll : createSagaPlaceholder(schema, 'onDeleteAll');
            _context8.next = 3;
            return (0, _effects.takeLatest)(schema.types.deleteAll.tap, flow);

          case 3:
          case 'end':
            return _context8.stop();
        }
      }
    }, _marked[6], this);
  }

  return [watchLoadFlow, watchDeleteFlow, watchUpdateFlow, watchInsertFlow, watchDeleteAllFlow, watchUpdateAllFlow, watchInsertAllFlow];
};