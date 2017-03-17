'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildReducerFor = undefined;

var _seamlessImmutable = require('seamless-immutable');

var _seamlessImmutable2 = _interopRequireDefault(_seamlessImmutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var buildReducerFor = exports.buildReducerFor = function buildReducerFor(types, schema) {
  var _handlers;

  var initialState = (0, _seamlessImmutable2.default)({
    items: {}
  });

  var handlers = (_handlers = {}, _defineProperty(_handlers, types.update.success, function (state, _ref) {
    var payload = _ref.payload;

    return state.setIn(['items', payload[schema.id]], payload);
  }), _defineProperty(_handlers, types.updateAll.success, function (state, _ref2) {
    var payload = _ref2.payload;

    return state.update('items', function (items) {
      return items.merge(payload);
    });
  }), _defineProperty(_handlers, types.insert.success, function (state, _ref3) {
    var payload = _ref3.payload;

    return state.setIn(['items', payload[schema.id]], payload);
  }), _defineProperty(_handlers, types.insertAll.success, function (state, _ref4) {
    var payload = _ref4.payload;

    return state.set('items', payload);
  }), _defineProperty(_handlers, types.delete.success, function (state, _ref5) {
    var payload = _ref5.payload;

    return state.update('items', function (items) {
      return items.without(payload[schema.id]);
    });
  }), _defineProperty(_handlers, types.deleteAll.success, function (state, _ref6) {
    var payload = _ref6.payload;

    var ids = payload.ids;
    if (!ids) {
      return state;
    }
    return state.update('items', function (items) {
      return items.without(ids);
    });
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
//# sourceMappingURL=reducer.js.map