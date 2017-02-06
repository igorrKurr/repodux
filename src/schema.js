import { pluralize } from 'inflection';
import { operations } from './actions';

const buildUrl = (apiUrl, opts) => (method) => (params) => { 
  const resource = pluralize(opts.name)
  const id = opts.id
  if (method === 'insert') {
    return `${apiUrl}/${resource}`
  } else if (method === 'delete') {
    return `${apiUrl}/${resource}/${params[id]}`
  } else if (method === 'update') {
    return `${apiUrl}/${resource}/${params[id]}`
  } else if (method === 'load') {
    return `${apiUrl}/${resource}`
  } else {
    return `${apiUrl}/${resource}`
  }
}

const identity = (x) => x

const buildChangeset = (opts) => (schema) => identity

export const createSchema = (opts) => {
  const apiUrl = opts.apiUrl
  const name = opts.name
  const id = opts.id
  if (!apiUrl) {
    throw 'Api url is reqired'
  }
  if (!name) {
    throw 'Name is reqired'
  }
  if (!id) {
    throw 'ID is reqired'
  }
  const urlBuilder = buildUrl(apiUrl, name)
  const changesetBuilder = buildChangeset(opts)

  const urls = operations.reduce((acc, operation) => {
    return {
      ...acc,
      [operation]: urlBuilder(operation)
    }
  }, {})
  
  const changeset = operations.reduce((acc, operation) => {
    return {
      ...acc,
      [operation]: changesetBuilder(operation)
    }
  }, {})

  return {
    urls,
    changeset,
    ...opts
  }
}
