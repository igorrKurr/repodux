const actionForOperation = (action) => (operation) => (payload) => ({
  type: `${operation}/${action.toUpperCase()}`,
  payload
})

const tap = actionForOperation('tap')
const success = actionForOperation('success')
const failure = actionForOperation('failure')
const optimistic = actionForOperation('optimistic')
const revertOptimistic = actionForOperation('revertOptimistic')

const operationForResource = (operation) => (resource) => ({
  tap: tap(`REPO/${resource.name.toUpperCase()}/${operation.toUpperCase()}`),
  success: success(`REPO/${resource.name.toUpperCase()}/${operation.toUpperCase()}`),
  failure: failure(`REPO/${resource.name.toUpperCase()}/${operation.toUpperCase()}`),
  optimistic: optimistic(`REPO/${resource.name.toUpperCase()}/${operation.toUpperCase()}`),
  revertOptimistic: revertOptimistic(`REPO/${resource.name.toUpperCase()}/${operation.toUpperCase()}`),
})

const update = operationForResource('update')
const index = operationForResource('index')
const destroy = operationForResource('destroy')
const create = operationForResource('create')

export const buildOperations = (resource) => ({
  update: update(resource),
  destroy: destroy(resource),
  create: create(resource),
  index: create(resource),
})
