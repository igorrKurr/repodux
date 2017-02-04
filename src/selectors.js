import { createSelector } from 'reselect';

const buildSelectors = (schema) => {
  const schemaSelector = state => state[schema.name]

  const itemsSelector = createSelector(
    [schemaSelector],
    (state) => state.items
  )

  const allSelector = () => createSelector(
    [itemsSelector],
    (items) => Object.values(items)
  )

  const getByIdSelector = (id) => createSelector(
    [itemsSelector],
    (items) => items[id]
  )

  return {
    all: allSelector,
    getById: getByIdSelector,
  }
}
