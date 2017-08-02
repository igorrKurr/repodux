import { createSelector } from 'reselect';

export const buildSelectors = (schema) => {
  const schemaSelector = state => state[schema]

  const itemsSelector = createSelector(
    [schemaSelector],
    (state) => state.items
  )

  const itemsArraySelector = createSelector(
    [itemsSelector],
    (items) => Object.values(items)
  )

  const allSelector = createSelector(
    [itemsArraySelector],
    (items) => items
  )

  const countSelector = createSelector(
    [itemsArraySelector],
    (items) => items.length
  )

  const statusSelector = createSelector(
    [schemaSelector],
    (state) => ({
      inserting: state.inserting,
      deleting: state.deleting,
      loading: state.loading,
      updating: state.updating,
    })
  )

  const errorSelector = createSelector(
    [schemaSelector],
    (state) => state.error
  )

  return {
    base: schemaSelector,
    all: allSelector,
    index: itemsSelector,
    count: countSelector,
    status: statusSelector,
    error: errorSelector,
  }
}
