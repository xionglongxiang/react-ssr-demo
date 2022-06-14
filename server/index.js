import React from 'react'
import path from 'path'
import fs from 'fs'

import { renderToString } from 'react-dom/server'
import { StaticRouter, matchPath, Route, Switch } from 'react-router-dom'
const express = require('express')
import routes from '../src/App'
import config from './config'

import proxy from 'http-proxy-middleware'
import { Provider } from 'react-redux'
import { getServerStore } from '../src/store/store'
import Header from '../src/component/Header'

const store = getServerStore()
const app = express()
app.use(express.static('public'))

// 客户端来的api开头的请求
app.use('/api', proxy({ target: 'http://localhost:9090', changeOrigin: true }))

function csrRender (res) {
  const file = path.resolve(process.cwd(), 'public/index.csr.html')
  let html = fs.readFileSync(file, 'utf-8')
  return res.send(html)
}

app.get('*', (req, res) => {
  // if (req.url.startsWith('/api/')) {
  // }
  // 存储网络请求
  if (req.query._mode === 'csr') {
    console.log('路由控制客户端渲染')
    return csrRender(res)
    // err.code==500
    // cpu or内存占比 降级
  }
  if (config.csr) {
    console.log('csr全局开关打开')
    return csrRender(res)
  }

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
        // 包装后
        // 规避报错 可以考虑加日志
        // const promise = new Promise((resolve, reject) => {
        //   loadData(store)
        //     .then(resolve)
        //     .catch(resolve)
        // })
        promises.push(loadData(store))
      }
    }
  })

  Promise.allSettled(promises)
    .then(data => {
      const context = {}

      const content = renderToString(
        <Provider store={store}>
          <StaticRouter location={req.url} context={context}>
            <Header></Header>
            <Switch>
              {routes.map(route => (
                <Route {...route}></Route>
              ))}
            </Switch>
          </StaticRouter>
        </Provider>
      )

      if (context.statuscode) {
        // 状态的切换和页面跳转
        res.status(context.statuscode)
      }
      console.log('context', context)

      if (context.action == 'REPLACE') {
        res.redirect(301, context.url)
      }

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
    .catch(err => {
      console.log('err', err)
      res.send('报错了')
    })
})

app.listen(8080, () => {
  console.log('8080 监听完毕')
})
