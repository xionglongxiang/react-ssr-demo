import React from 'react'
import * as ReactDOM from 'react-dom/client'
import App from '../src/App'
import { BrowserRouter } from 'react-router-dom'
import store from '../src/store/store'
import { Provider } from 'react-redux'
console.log('client import store', store)

const Page = (
  <Provider store={store}>
    <BrowserRouter>{App}</BrowserRouter>
  </Provider>
)

ReactDOM.hydrateRoot(document.getElementById('root'), Page)
