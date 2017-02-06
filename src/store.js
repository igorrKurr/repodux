import { createStore, applyMiddleware, compose } from 'redux';
// import { autoRehydrate } from 'redux-persist';
import createSagaMiddleware, { END } from 'redux-saga';

export const configureStore = (reducers, sagas) => {
  const sagaMiddleware = createSagaMiddleware();

  const middleware = [sagaMiddleware];
  middleware.push(sagaMiddleware);

  const enhancers = compose(
    applyMiddleware(...middleware),
    // autoRehydrate()
  );

  const store = createStore(
    reducers,
    enhancers
  );

  sagaMiddleware.run(sagas);

  store.close = () => store.dispatch(END)

  return store;
}
