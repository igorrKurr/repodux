import { buildReducer, prepareData } from './reducer';
import { buildSelectors } from './selectors';
import { buildTypes, buildOperations } from './actions';
import { buildSagas } from './sagas';

import { createSelector } from 'reselect';

export class Resource {
  constructor() {
    const idProp = this.id || 'id'
    this.id = idProp

    const name = this.name || this.constructor.name
    this.name = name

    const types = buildTypes(this.name)
    const actions = buildOperations(this.name)
    const selectors = buildSelectors(this.name)

    this.types = types
    this.actions = actions
    this.selectors = selectors

    const reducer = { [this.name]: buildReducer(this.types, this.id) }
    this.reducer = reducer

    const sagas = buildSagas(this)

    this.sagas = sagas

    Object.keys(actions).forEach(action => this[action] = actions[action])
    Object.keys(selectors).forEach(selector => this[selector] = selectors[selector])

    const baseSelector = state => state[name]

    this.select = (f) => createSelector([baseSelector], f)
  }

  normalize = (data) => {
    return prepareData(this.id, data)
  }
}
