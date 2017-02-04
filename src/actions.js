const actions = ['tap', 'success', 'failure', 'optimistic', 'revertOptimistic']
const operations = ['update', 'create', 'destroy', 'index']

const actionType = (operation, action, schema) => `REPO/${schema.name.toUpperCase()}/${operation.toUpperCase()}/${action.toUpperCase()}`;

const build = (typeBuilder) => (schema) => {
  return operations.reduce((acc, operation) => {
    return {
      ...acc,
      [operation]: actions.reduce((acc1, action) => {
        return {
          ...acc1,
          [action]: typeBuilder(actionType(operation, action, schema)),
        }
      }, {})
    }
  }, {})
}

export const buildTypes = build(type => type)
export const buildOperations = build(type => (payload) => ({ type, payload }))
