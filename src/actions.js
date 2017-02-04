import snakeCase from 'lodash/snakeCase';

const actions = ['tap', 'success', 'failure', 'optimistic', 'revertOptimistic']
const operations = ['load', 'update', 'updateAll', 'delete', 'deleteAll', 'insert', 'insertAll']

const actionName = (action) => snakeCase(action)

const actionType = (operation, action, schema) =>
  `REPO/${snakeCase(schema.name)}/${snakeCase(operation)}/${snakeCase(action)}`.toUpperCase();

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
