import snakeCase from 'lodash/snakeCase';
import set from 'lodash/set';

const actions = ['tap', 'success', 'failure']
export const operations = ['load', 'update', 'updateAll', 'delete', 'deleteAll', 'insert', 'insertAll']

const actionType = (operation, action, schema) =>
  `${snakeCase(schema)}/${snakeCase(operation)}/${snakeCase(action)}`.toUpperCase();

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

const buildForEvents = (func) => (events, schema) => events.reduce((acc, event) => {
  return {
    ...acc,
    ...set(acc, event.replace(':', '.'), func(event, schema)),
  }
}, {})

const buildTypeEventBase = (event) => `${event.split(':').map(snakeCase).join('/')}`.toUpperCase()
const buildTypeEvent = (event, schema) => schema ? `${snakeCase(schema)}/${buildTypeEventBase(event)}`.toUpperCase() : buildTypeEventBase(event)
const buildActionEvent = (event, schema) => (payload) => ({
  type: buildTypeEvent(event, schema),
  payload
})

export const buildTypes = build(type => type)
export const buildOperations = build(type => (payload) => ({ type, payload }))

export const buildEventTypes = buildForEvents(buildTypeEvent)
export const buildEventActions = buildForEvents(buildActionEvent)
