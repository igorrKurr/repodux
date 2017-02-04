import Immutable from 'seamless-immutable';

export const buildReducer = (types, schema) => {
  const initialState = Immutable({
    items: {}
  });

  const handlers = {
    [types.update.success]: (state, { payload }) => {
      return state.setIn(['items', payload[schema.id]], payload);
    },
    [types.index.success]: (state, { payload }) => {
      return state.set('items', payload);
    },
    [types.create.success]: (state, { payload }) => {
      return state.setIn(['items', payload[schema.id]], payload);
    },
    [types.destroy.success]: (state, { payload }) => {
      return state.update('items', (items) => items.without(payload[schema.id]))
    }
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
