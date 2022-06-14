import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter, matchPath, Route } from 'react-router-dom'
const express = require('express')
import routes from '../src/App'
import { Provider } from 'react-redux'
import { getServerStore } from '../src/store/store'
import Header from '../src/component/Header'

const store = getServerStore()
const app = express()
app.use(express.static('public'))

app.get('*', (req, res) => {
  const promises = []
  // use `some` to imitate `<Switch>` behavior of selecting only
  // the first to match
  routes.some(route => {
    const match = matchPath(req.path, route)
  })
  routes.some(route => {
    // use `matchPath` here
    const match = matchPath(req.path, route)
    if (match) {
      console.log('route match', route)
      const { loadData } = route.component
      if (loadData) {
        promises.push(loadData(store))
      }
    }
  })

  Promise.all(promises).then(data => {
    const content = renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url}>
          <Header></Header>
          {routes.map(route => (
            <Route {...route}></Route>
          ))}
        </StaticRouter>
      </Provider>
    )

    res.send(`
      <html>
        <head>
          <meta charset="utf-8" />
          <title>react ssr</title>
        </head>
        <body>
          <div id="root">${content}</div>
          <script>
            window.__context = ${JSON.stringify(store.getState())}
          </script>
          <script src="./bundle.js"></script>
        </body>
      </html>
    `)
  })
})

app.listen(8080, () => {
  console.log('8080 监听完毕')
})
