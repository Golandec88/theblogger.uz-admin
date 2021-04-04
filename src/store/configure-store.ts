import {applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga'

import {IRootState} from "./types";
import reducers from './root-reducer'
import rootSaga from './root-saga'

const sagaMiddleware = createSagaMiddleware()
const middleware = applyMiddleware(sagaMiddleware)

const configureStore = createStore<IRootState, any, any, any>(reducers, middleware);
sagaMiddleware.run(rootSaga)

export default configureStore;