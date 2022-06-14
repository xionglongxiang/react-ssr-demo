import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import indexReducer from './index'

console.log('store/store.js')
const reducer = combineReducers({
  index: indexReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

console.log('store/store: +++', store)
export default store
