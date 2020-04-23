import { createStore, applyMiddleware, compose } from 'redux'
import reducers from './reducer'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = undefined
if (process.env.NODE_ENV === "development") {
    store = createStore(
        reducers,
        composeEnhancers(applyMiddleware(thunk, logger))
    )
} else {
    store = createStore(
        reducers,
        applyMiddleware(thunk)
    )  
}
export default store