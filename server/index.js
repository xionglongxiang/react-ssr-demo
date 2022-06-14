import React from 'react'
import { renderToString } from 'react-dom/server'
const express = require('express')
import App from '../App'

const app = express()

app.get('/', (req, res) => {
  const Page = <App title='开课吧'></App>
  const content = renderToString(Page)

  res.send(`
    <html>
      <head>
        <meta charset="utf-8" />
        <title>react ssr</title>
      </head>
      <body>
        <div id="root">${content}</div>
      </body>
    </html>
  `)
})

app.listen(8080, () => {
  console.log('8080 监听完毕')
})
