import React from 'react'
import * as ReactDOM from 'react-dom/client'
import routes from '../src/App'
import { BrowserRouter, Route } from 'react-router-dom'
import { getClientStore } from '../src/store/store'
import { Provider } from 'react-redux'
import Header from '../src/component/Header'

const store = getClientStore()
const Page = (
  <Provider store={store}>
    <BrowserRouter>
      <Header></Header>
      {routes.map(route => (
        <Route {...route}></Route>
      ))}
    </BrowserRouter>
  </Provider>
)

ReactDOM.hydrateRoot(document.getElementById('root'), Page)
