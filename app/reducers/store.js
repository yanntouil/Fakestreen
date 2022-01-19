import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import layoutReducer from './layout/reducer'
import translationReducer from './translation/reducer'


/**
 * Conbine reducers
 */
const rootReducer = combineReducers({
    layoutReducer,
    translationReducer,
})

/**
 * Create store
 */
const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),// Defered dispatch
        //typeof window !== 'undefined' && window.navigator.userAgent.includes('Chrome') ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : compose
    )
)
export default store