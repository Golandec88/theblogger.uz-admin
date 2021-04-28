import {applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga'

import AppReducer from './reducer'
import RootSaga from './root-saga'
import initialState from "./initial-state"

const sagaMiddleware = createSagaMiddleware()
const middleware = applyMiddleware(sagaMiddleware)

const store = createStore(AppReducer, initialState, middleware);
sagaMiddleware.run(RootSaga)

export default store;