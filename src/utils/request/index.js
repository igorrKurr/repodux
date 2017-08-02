import { HttpError, NetworkError } from './errors';

import { call, select } from 'redux-saga/effects';

const TIMEOUT_TIME = 5000;
const ERROR_MESSAGE = 'Request Timeout';

function parseJSON(response) {
  return response.text().then((text) => text ? JSON.parse(text) : null);
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  throw new HttpError(response.statusText, response);
}

const timeoutPromise = (ms) => (promise) => {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error(ERROR_MESSAGE))
    }, ms);
    promise.then(
      (res) => {
        clearTimeout(timeoutId);
        resolve(res);
      },
      (err) => {
        clearTimeout(timeoutId);
        reject(err);
      }
    );
  })
}

const timeout = timeoutPromise(TIMEOUT_TIME);

export function request(url, options) {
  return timeout(fetch(url, options))
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      const error = (err instanceof HttpError) ? err : new NetworkError(err, url);
      throw error;
    })
}

export const authRequest = function * authRequest(url, options) {
  const token = yield select(state => state.auth.token);

  const headers = {
    'Authorization': `Bearer ${token}`,
  };
  if (options && ['PUT', 'POST', 'DELETE'].includes(options.method)) {
    headers['Content-Type'] = 'application/json';
  }

  return yield call(request, url, {
    ...options,
    headers
  });
}

export default request;
