import Immutable from 'seamless-immutable';

export const buildReducer = (types, id) => {
  const initialState = Immutable({
    items: {},
    inserting: false,
    deleting: false,
    loading: false,
    updating: false,
    error: false,
  });

  const handlers = {
    [types.load.tap]: (state, { payload }) => {
      return state.set('loading', true)
            .set('error', false)
    },
    [types.load.success]: (state, { payload }) => {
      return state.set('items', payload).set('loading', false);
    },
    [types.load.failure]: (state, { payload }) => {
      return state.set('loading', false)
            .set('error', payload)
    },
    [types.update.tap]: (state) => {
      return state.set('updating', true)
            .set('error', false)
    },
    [types.update.success]: (state, { payload }) => {
      return state.updateIn(['items', payload[id]], (item) => item.merge(payload)).set('updating', false)
    },
    [types.update.failure]: (state, { payload }) => {
      return state.set('updating', true)
            .set('error', payload)
    },
    [types.updateAll.tap]: (state) => {
      return state.set('updating', true)
            .set('error', false)
    },
    [types.updateAll.success]: (state, { payload }) => {
      return state.update('items', (items) => items.merge(payload)).set('updating', false)
    },
    [types.updateAll.failure]: (state, { payload }) => {
      return state.set('updating', false)
            .set('error', payload)
    },
    [types.insert.tap]: (state) => {
      return state.set('inserting', true)
            .set('error', false)
    },
    [types.insert.success]: (state, { payload }) => {
      return state.setIn(['items', payload[id]], payload).set('inserting', false)
    },
    [types.insert.failure]: (state, { payload }) => {
      return state.set('inserting', false)
            .set('error', payload)
    },
    [types.insertAll.tap]: (state) => {
      return state.set('inserting', true)
            .set('error', false)
    },
    [types.insertAll.success]: (state, { payload }) => {
      return state.update('items', (items) => items.merge(payload)).set('inserting', false)
    },
    [types.insertAll.failure]: (state, { payload }) => {
      return state.set('inserting', false)
            .set('error', payload)
    },
    [types.delete.tap]: (state) => {
      return state.set('deleting', true)
            .set('error', false)
    },
    [types.delete.success]: (state, { payload }) => {
      return state.update('items', (items) => items.without(payload[id])).set('deleting', false)
    },
    [types.delete.failure]: (state, { payload }) => {
      return state.set('deleting', false)
            .set('error', payload)
    },
    [types.deleteAll.tap]: (state) => {
      return state.set('deleting', true)
            .set('error', false)
    },
    [types.deleteAll.success]: (state, { payload }) => {
      const ids = payload.ids;
      if (!ids || ids.length === 0) {
        return state;
      }
      return state.update('items', (items) => items.without(ids)).set('deleting', false)
    },
    [types.deleteAll.failure]: (state, { payload }) => {
      return state.set('deleting', false)
            .set('error', payload)
    },
    [types.error.clear]: (state) => {
      return state.set('error', false)
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

export const prepareData = (id, data) => {
  return data.reduce((acc, n) => ({
    ...acc,
    [n[id]]: {
      ...n,
      id: n[id],
    }
  }), {})
}
