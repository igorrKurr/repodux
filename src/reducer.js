import Immutable from 'seamless-immutable';

export const buildReducerFor = (types, schema) => {
  const initialState = Immutable({
    items: {}
  });

  const handlers = {
    [types.update.success]: (state, { payload }) => {
      return state.setIn(['items', payload[schema.id]], payload);
    },
    [types.updateAll.success]: (state, { payload }) => {
      return state.update('items', (items) => items.merge(payload))
    },
    [types.insert.success]: (state, { payload }) => {
      return state.setIn(['items', payload[schema.id]], payload);
    },
    [types.insertAll.success]: (state, { payload }) => {
      return state.set('items', payload);
    },
    [types.delete.success]: (state, { payload }) => {
      return state.update('items', (items) => items.without(payload[schema.id]))
    },
    [types.deleteAll.success]: (state, { payload }) => {
      const ids = payload.ids;
      if (!ids) {
        return state;
      }
      return state.update('items', (items) => items.without(ids))
    },
  };

  const reducer = (state = initialState, action) => {
    if (!action) {
      return state
    }
    
    if (!action.type) {
      return state
    }

    const handler = handlers[action.type]

    if (!handler) {
      return state
    }

    return handler(state, action)
  }

  return reducer
}
