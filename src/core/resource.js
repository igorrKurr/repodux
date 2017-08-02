import { createSelector } from 'reselect';

import { buildReducer, prepareData } from './reducer';
import { buildSelectors } from './selectors';
import { buildTypes, buildOperations, buildEventTypes, buildEventActions } from './actions';
import { buildSagas } from './sagas';
import { connect } from './connect';

export class Resource {
  constructor() {
    const idProp = this.id || 'id'
    this.id = idProp

    const name = this.name || this.constructor.name
    this.name = name.toLowerCase()

    const baseTypes = buildTypes(this.name)
    const errorTypes = buildEventTypes(['error:clear'], this.name)
    const types = {...baseTypes, ...errorTypes}

    const operations = buildOperations(this.name)
    const errorOperations = buildEventActions(['error:clear'], this.name)
    const actions = {...operations, ...errorOperations}

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

    const baseSelector = state => state[this.name]

    this.select = (f) => createSelector([baseSelector], f)
    this.connect = connect(this)
  }

  normalize = (data) => {
    return prepareData(this.id, data)
  }
}
