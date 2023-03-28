import { createStore, applyMiddleware, compose } from "redux"
import { routerMiddleware } from "react-router-redux"
import createSagaMiddleware from "@redux-saga/core"
import { createBrowserHistory } from "history"
import logger from "redux-logger"
import rootReducer from "./AppReducer"
import rootSaga from "./Sagas"

export const history = createBrowserHistory()

const initialState = {}
const enhancers = [
  // Add what you want to add down here
  // typeof window !== "undefined" &&
  //   window.__REDUX_DEVTOOLS_EXTENSION__ &&
  //   window.__REDUX_DEVTOOLS_EXTENSION__(),
]

const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware, routerMiddleware(history), logger]
const composedEnhancers = compose(applyMiddleware(...middlewares), ...enhancers)
const store = createStore(rootReducer, initialState, composedEnhancers)

sagaMiddleware.run(rootSaga)

export default store
