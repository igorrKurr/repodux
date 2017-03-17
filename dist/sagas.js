'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildSagasFor = undefined;

var _flatten = require('lodash/flatten');

var _flatten2 = _interopRequireDefault(_flatten);

var _effects = require('redux-saga/effects');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var buildSagasFor = exports.buildSagasFor = function buildSagasFor(types, operations, schema) {
  var _marked = [loadFlow, watchLoadFlow, insertAllFlow, watchInsertAllFlow, insertFlow, watchInsertFlow, updateFlow, watchUpdateFlow, updateAllFlow, watchUpdateAllFlow, deleteFlow, watchDeleteFlow, deleteAllFlow, watchDeleteAllFlow].map(regeneratorRuntime.mark);

  var urls = schema.urls;

  function loadFlow(data) {
    var http, response;
    return regeneratorRuntime.wrap(function loadFlow$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            http = schema.auth.load ? authRequest : request;
            _context.next = 4;
            return (0, _effects.call)(http, urls.load(data));

          case 4:
            response = _context.sent;
            _context.next = 7;
            return (0, _effects.put)(operations.insertAll.success(schema.changeset.insertAll(response)));

          case 7:
            return _context.abrupt('return', _context.sent);

          case 10:
            _context.prev = 10;
            _context.t0 = _context['catch'](0);
            _context.next = 14;
            return (0, _effects.put)(operations.insertAll.failure(schema.changeset.error(_context.t0)));

          case 14:
            return _context.abrupt('return', _context.sent);

          case 15:
          case 'end':
            return _context.stop();
        }
      }
    }, _marked[0], this, [[0, 10]]);
  }

  function watchLoadFlow() {
    return regeneratorRuntime.wrap(function watchLoadFlow$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _effects.takeLatest)(operations.load.tap, loadFlow);

          case 2:
          case 'end':
            return _context2.stop();
        }
      }
    }, _marked[1], this);
  }

  function insertAllFlow(data) {
    var http, response;
    return regeneratorRuntime.wrap(function insertAllFlow$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            http = schema.auth.insertAll ? authRequest : request;
            _context3.next = 4;
            return (0, _effects.call)(http, urls.insertAll(data), {
              method: 'POST',
              body: JSON.stringify(data)
            });

          case 4:
            response = _context3.sent;
            _context3.next = 7;
            return (0, _effects.put)(operations.insertAll.success(schema.changeset.insertAll(response)));

          case 7:
            _context3.next = 13;
            break;

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3['catch'](0);
            _context3.next = 13;
            return (0, _effects.put)(operations.insertAll.failure(schema.changeset.error(_context3.t0)));

          case 13:
          case 'end':
            return _context3.stop();
        }
      }
    }, _marked[2], this, [[0, 9]]);
  }

  function watchInsertAllFlow() {
    return regeneratorRuntime.wrap(function watchInsertAllFlow$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return (0, _effects.takeLatest)(operations.insertAll.tap, insertAllFlow);

          case 2:
          case 'end':
            return _context4.stop();
        }
      }
    }, _marked[3], this);
  }

  function insertFlow(data) {
    var http, response;
    return regeneratorRuntime.wrap(function insertFlow$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            http = schema.auth.insert ? authRequest : request;
            _context5.next = 4;
            return (0, _effects.call)(http, urls.insert(data), {
              method: 'POST',
              body: JSON.stringify(data)
            });

          case 4:
            response = _context5.sent;
            _context5.next = 7;
            return (0, _effects.put)(operations.insert.success(schema.changeset.insert(response)));

          case 7:
            _context5.next = 13;
            break;

          case 9:
            _context5.prev = 9;
            _context5.t0 = _context5['catch'](0);
            _context5.next = 13;
            return (0, _effects.put)(operations.insert.failure(schema.changeset.error(_context5.t0)));

          case 13:
          case 'end':
            return _context5.stop();
        }
      }
    }, _marked[4], this, [[0, 9]]);
  }

  function watchInsertFlow() {
    return regeneratorRuntime.wrap(function watchInsertFlow$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return (0, _effects.takeLatest)(operations.insertAll.tap, insertFlow);

          case 2:
          case 'end':
            return _context6.stop();
        }
      }
    }, _marked[5], this);
  }

  function updateFlow(data) {
    var http, response;
    return regeneratorRuntime.wrap(function updateFlow$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            http = schema.auth.update ? authRequest : request;
            _context7.next = 4;
            return (0, _effects.call)(http, urls.update(data), {
              method: 'PUT',
              body: JSON.stringify(data)
            });

          case 4:
            response = _context7.sent;
            _context7.next = 7;
            return (0, _effects.put)(operations.update.success(schema.changeset.update(response)));

          case 7:
            _context7.next = 13;
            break;

          case 9:
            _context7.prev = 9;
            _context7.t0 = _context7['catch'](0);
            _context7.next = 13;
            return (0, _effects.put)(operations.update.failure(schema.changeset.error(_context7.t0)));

          case 13:
          case 'end':
            return _context7.stop();
        }
      }
    }, _marked[6], this, [[0, 9]]);
  }

  function watchUpdateFlow() {
    return regeneratorRuntime.wrap(function watchUpdateFlow$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return (0, _effects.takeLatest)(operations.update.tap, updateFlow);

          case 2:
          case 'end':
            return _context8.stop();
        }
      }
    }, _marked[7], this);
  }

  function updateAllFlow(data) {
    var http, response;
    return regeneratorRuntime.wrap(function updateAllFlow$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            http = schema.auth.updateAll ? authRequest : request;
            _context9.next = 4;
            return (0, _effects.call)(http, urls.updateAll(data), {
              method: 'PUT',
              body: JSON.stringify(data)
            });

          case 4:
            response = _context9.sent;
            _context9.next = 7;
            return (0, _effects.put)(operations.updateAll.success(schema.changeset.updateAll(response)));

          case 7:
            _context9.next = 13;
            break;

          case 9:
            _context9.prev = 9;
            _context9.t0 = _context9['catch'](0);
            _context9.next = 13;
            return (0, _effects.put)(operations.updateAll.failure(schema.changeset.error(_context9.t0)));

          case 13:
          case 'end':
            return _context9.stop();
        }
      }
    }, _marked[8], this, [[0, 9]]);
  }

  function watchUpdateAllFlow() {
    return regeneratorRuntime.wrap(function watchUpdateAllFlow$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return (0, _effects.takeLatest)(operations.updateAll.tap, updateAllFlow);

          case 2:
          case 'end':
            return _context10.stop();
        }
      }
    }, _marked[9], this);
  }

  function deleteFlow(data) {
    var http, response;
    return regeneratorRuntime.wrap(function deleteFlow$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.prev = 0;
            http = schema.auth.delete ? authRequest : request;
            _context11.next = 4;
            return (0, _effects.call)(http, urls.delete(data), {
              method: 'DELETE',
              body: JSON.stringify(data)
            });

          case 4:
            response = _context11.sent;
            _context11.next = 7;
            return (0, _effects.put)(operations.delete.success(schema.changeset.delete(response)));

          case 7:
            _context11.next = 13;
            break;

          case 9:
            _context11.prev = 9;
            _context11.t0 = _context11['catch'](0);
            _context11.next = 13;
            return (0, _effects.put)(operations.delete.failure(schema.changeset.error(_context11.t0)));

          case 13:
          case 'end':
            return _context11.stop();
        }
      }
    }, _marked[10], this, [[0, 9]]);
  }

  function watchDeleteFlow() {
    return regeneratorRuntime.wrap(function watchDeleteFlow$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.next = 2;
            return (0, _effects.takeLatest)(operations.delete.tap, deleteAllFlow);

          case 2:
          case 'end':
            return _context12.stop();
        }
      }
    }, _marked[11], this);
  }

  function deleteAllFlow(data) {
    var http, response;
    return regeneratorRuntime.wrap(function deleteAllFlow$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.prev = 0;
            http = schema.auth.deleteAll ? authRequest : request;
            _context13.next = 4;
            return (0, _effects.call)(http, urls.deleteAll(data), {
              method: 'DELETE',
              body: JSON.stringify(data)
            });

          case 4:
            response = _context13.sent;
            _context13.next = 7;
            return (0, _effects.put)(operations.deleteAll.success(schema.changeset.deleteAll(response)));

          case 7:
            _context13.next = 13;
            break;

          case 9:
            _context13.prev = 9;
            _context13.t0 = _context13['catch'](0);
            _context13.next = 13;
            return (0, _effects.put)(operations.deleteAll.failure(schema.changeset.error(_context13.t0)));

          case 13:
          case 'end':
            return _context13.stop();
        }
      }
    }, _marked[12], this, [[0, 9]]);
  }

  function watchDeleteAllFlow() {
    return regeneratorRuntime.wrap(function watchDeleteAllFlow$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.next = 2;
            return (0, _effects.takeLatest)(operations.deleteAll.tap, deleteAllFlow);

          case 2:
          case 'end':
            return _context14.stop();
        }
      }
    }, _marked[13], this);
  }

  return [watchDeleteAllFlow, watchDeleteFlow, watchUpdateAllFlow, watchUpdateFlow, watchInsertFlow, watchInsertAllFlow, watchLoadFlow];
};
//# sourceMappingURL=sagas.js.map