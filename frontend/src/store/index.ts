import { createStore, compose, applyMiddleware } from 'redux'
import thunk from "redux-thunk";

import appReducer from '../reducers'

// @ts-ignore
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  appReducer,
  composeEnhancer(applyMiddleware(thunk))
)

export default store
