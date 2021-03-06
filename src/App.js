import React from 'react'
import Index from './container/Index'
import About from './container/About'
import User from './container/User'
import Notfound from './container/Notfound'
import './App.css'
// export default (
//   <div>
//     <Route path="/" exact component={Index}></Route>
//     <Route path="/about" exact component={About}></Route>
//   </div>
// )

// 改造成js的配置，才能获取组件
export default [
  {
    path: '/',
    component: Index,
    // loadData:Index.loadData,
    exact: true,
    key: 'index'
    // 嵌套路由
    // routes:[{

    // }]
  },
  {
    path: '/about',
    component: About,
    exact: true,
    key: 'about'
  },
  {
    path: '/user',
    component: User,
    exact: true,
    key: 'user'
  },
  {
    component: Notfound,
    key: 'notfound'
  }
]
