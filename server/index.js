import React from 'react'
import { renderToString } from 'react-dom/server'
const express = require('express')
import App from '../App'

const app = express()
app.use(express.static('public'))

app.get('/', (req, res) => {
  const content = renderToString(App)

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
