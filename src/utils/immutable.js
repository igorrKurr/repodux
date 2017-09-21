import Immutable from 'seamless-immutable';

export const immutableTransform = {
  out: (state) => {
    return Immutable(state)
  },
  in: (state) => {
    return state.asMutable ? state.asMutable({deep: true}) : state;
  }
}
