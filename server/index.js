import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
const express = require('express')
import App from '../src/App'
import { Provider } from 'react-redux'
import store from '../src/store/store'
console.log('server import store', store)

const app = express()
app.use(express.static('public'))

app.get('*', (req, res) => {
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url}>{App}</StaticRouter>
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
        <script src="./bundle.js"></script>
      </body>
    </html>
  `)
})

app.listen(8080, () => {
  console.log('8080 监听完毕')
})
