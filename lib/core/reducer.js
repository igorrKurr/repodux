'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildReducer = exports.prepareData = exports.buildReducerImmutable = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _seamlessImmutable = require('seamless-immutable');

var _seamlessImmutable2 = _interopRequireDefault(_seamlessImmutable);

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var buildReducerImmutable = exports.buildReducerImmutable = function buildReducerImmutable(types, id) {
  var _handlers;

  var initialState = (0, _seamlessImmutable2.default)({
    items: {},
    inserting: false,
    deleting: false,
    loading: false,
    updating: false,
    error: false
  });

  var handlers = (_handlers = {}, _defineProperty(_handlers, types.load.tap, function (state, _ref) {
    var payload = _ref.payload;

    return state.set('loading', true).set('error', false);
  }), _defineProperty(_handlers, types.load.success, function (state, _ref2) {
    var payload = _ref2.payload;

    return state.set('items', payload).set('loading', false);
  }), _defineProperty(_handlers, types.load.failure, function (state, _ref3) {
    var payload = _ref3.payload;

    return state.set('loading', false).set('error', payload);
  }), _defineProperty(_handlers, types.update.tap, function (state) {
    return state.set('updating', true).set('error', false);
  }), _defineProperty(_handlers, types.update.success, function (state, _ref4) {
    var payload = _ref4.payload;

    return state.updateIn(['items', payload[id]], function (item) {
      return item.merge(payload);
    }).set('updating', false);
  }), _defineProperty(_handlers, types.update.failure, function (state, _ref5) {
    var payload = _ref5.payload;

    return state.set('updating', true).set('error', payload);
  }), _defineProperty(_handlers, types.updateAll.tap, function (state) {
    return state.set('updating', true).set('error', false);
  }), _defineProperty(_handlers, types.updateAll.success, function (state, _ref6) {
    var payload = _ref6.payload;

    return state.update('items', function (items) {
      return items.merge(payload);
    }).set('updating', false);
  }), _defineProperty(_handlers, types.updateAll.failure, function (state, _ref7) {
    var payload = _ref7.payload;

    return state.set('updating', false).set('error', payload);
  }), _defineProperty(_handlers, types.insert.tap, function (state) {
    return state.set('inserting', true).set('error', false);
  }), _defineProperty(_handlers, types.insert.success, function (state, _ref8) {
    var payload = _ref8.payload;

    return state.setIn(['items', payload[id]], payload).set('inserting', false);
  }), _defineProperty(_handlers, types.insert.failure, function (state, _ref9) {
    var payload = _ref9.payload;

    return state.set('inserting', false).set('error', payload);
  }), _defineProperty(_handlers, types.insertAll.tap, function (state) {
    return state.set('inserting', true).set('error', false);
  }), _defineProperty(_handlers, types.insertAll.success, function (state, _ref10) {
    var payload = _ref10.payload;

    return state.update('items', function (items) {
      return items.merge(payload);
    }).set('inserting', false);
  }), _defineProperty(_handlers, types.insertAll.failure, function (state, _ref11) {
    var payload = _ref11.payload;

    return state.set('inserting', false).set('error', payload);
  }), _defineProperty(_handlers, types.delete.tap, function (state) {
    return state.set('deleting', true).set('error', false);
  }), _defineProperty(_handlers, types.delete.success, function (state, _ref12) {
    var payload = _ref12.payload;

    return state.update('items', function (items) {
      return items.without(payload[id]);
    }).set('deleting', false);
  }), _defineProperty(_handlers, types.delete.failure, function (state, _ref13) {
    var payload = _ref13.payload;

    return state.set('deleting', false).set('error', payload);
  }), _defineProperty(_handlers, types.deleteAll.tap, function (state) {
    return state.set('deleting', true).set('error', false);
  }), _defineProperty(_handlers, types.deleteAll.success, function (state, _ref14) {
    var payload = _ref14.payload;

    var ids = payload.ids;
    if (!ids || ids.length === 0) {
      return state;
    }
    return state.update('items', function (items) {
      return items.without(ids);
    }).set('deleting', false);
  }), _defineProperty(_handlers, types.deleteAll.failure, function (state, _ref15) {
    var payload = _ref15.payload;

    return state.set('deleting', false).set('error', payload);
  }), _defineProperty(_handlers, types.error.clear, function (state) {
    return state.set('error', false);
  }), _handlers);

  var reducer = function reducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    if (!action) {
      return state;
    }

    if (!action.type) {
      return state;
    }

    var handler = handlers[action.type];

    if (!handler) {
      return state;
    }

    return handler(state, action);
  };

  return reducer;
};

var prepareData = exports.prepareData = function prepareData(id, data) {
  return data.reduce(function (acc, n) {
    return _extends({}, acc, _defineProperty({}, n[id], _extends({}, n, {
      id: n[id]
    })));
  }, {});
};

var buildReducerPlain = function buildReducerPlain(types, id) {
  var _handlers2;

  var initialState = {
    items: {},
    inserting: false,
    deleting: false,
    loading: false,
    updating: false
  };

  var handlers = (_handlers2 = {}, _defineProperty(_handlers2, types.load.tap, function (state, _ref16) {
    var payload = _ref16.payload;

    return _extends({}, state, {
      loading: true
    });
  }), _defineProperty(_handlers2, types.load.success, function (state, _ref17) {
    var payload = _ref17.payload;

    return _extends({}, state, {
      items: payload,
      loading: false
    });
  }), _defineProperty(_handlers2, types.load.failure, function (state) {
    return _extends({}, state, {
      loading: false
    });
  }), _defineProperty(_handlers2, types.update.tap, function (state) {
    return _extends({}, state, {
      updating: true
    });
  }), _defineProperty(_handlers2, types.update.success, function (state, _ref18) {
    var payload = _ref18.payload;

    return _extends({}, state, {
      items: _extends({}, state.items, _defineProperty({}, payload[id], _extends({}, state.items[payload[id]], payload))),
      updating: false
    });
  }), _defineProperty(_handlers2, types.update.failure, function (state, _ref19) {
    var payload = _ref19.payload;

    return _extends({}, state, {
      updating: false
    });
  }), _defineProperty(_handlers2, types.updateAll.tap, function (state) {
    return _extends({}, state, {
      updating: true
    });
  }), _defineProperty(_handlers2, types.updateAll.success, function (state, _ref20) {
    var payload = _ref20.payload;

    return _extends({}, state, {
      items: _extends({}, state.items, payload),
      updating: false
    });
  }), _defineProperty(_handlers2, types.updateAll.failure, function (state, _ref21) {
    var payload = _ref21.payload;

    return _extends({}, state, {
      updating: false
    });
  }), _defineProperty(_handlers2, types.insert.tap, function (state) {
    return _extends({}, state, {
      inserting: true
    });
  }), _defineProperty(_handlers2, types.insert.success, function (state, _ref22) {
    var payload = _ref22.payload;

    return _extends({}, state, {
      items: _extends({}, state.items, _defineProperty({}, payload[id], payload)),
      inserting: false
    });
  }), _defineProperty(_handlers2, types.insert.failure, function (state) {
    return _extends({}, state, {
      inserting: false
    });
  }), _defineProperty(_handlers2, types.insertAll.tap, function (state) {
    return _extends({}, state, {
      inserting: true
    });
  }), _defineProperty(_handlers2, types.insertAll.success, function (state, _ref23) {
    var payload = _ref23.payload;

    return _extends({}, state, {
      items: _extends({}, state.items, payload),
      inserting: false
    });
  }), _defineProperty(_handlers2, types.insertAll.failure, function (state) {
    return _extends({}, state, {
      inserting: false
    });
  }), _defineProperty(_handlers2, types.delete.tap, function (state) {
    return _extends({}, state, {
      deleting: true
    });
  }), _defineProperty(_handlers2, types.delete.success, function (state, _ref24) {
    var payload = _ref24.payload;

    return _extends({}, state, {
      items: (0, _omit2.default)(state.items, payload[id]),
      deleting: false
    });
  }), _defineProperty(_handlers2, types.delete.failure, function (state, _ref25) {
    var payload = _ref25.payload;

    return _extends({}, state, {
      deleting: false
    });
  }), _defineProperty(_handlers2, types.deleteAll.tap, function (state) {
    return _extends({}, state, {
      deleting: true
    });
  }), _defineProperty(_handlers2, types.deleteAll.success, function (state, _ref26) {
    var payload = _ref26.payload;

    var ids = payload.ids;
    if (!ids || ids.length === 0) {
      return _extends({}, state, {
        deleting: false
      });
    }
    return _extends({}, state, {
      items: (0, _omit2.default)(state.items, ids),
      deleting: false
    });
  }), _defineProperty(_handlers2, types.deleteAll.failure, function (state, _ref27) {
    var payload = _ref27.payload;

    return _extends({}, state, {
      deleting: false
    });
  }), _handlers2);

  var reducer = function reducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    if (!action) {
      return state;
    }

    if (!action.type) {
      return state;
    }

    var handler = handlers[action.type];

    if (!handler) {
      return state;
    }

    return handler(state, action);
  };

  return reducer;
};

var buildReducer = exports.buildReducer = function buildReducer(types, id, params) {
  if (params && params.immutable) {
    return buildReducerImmutable(types, id);
  }
  return buildReducerPlain(types, id);
};