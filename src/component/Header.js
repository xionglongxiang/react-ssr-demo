import React from 'react'
import { Link } from 'react-router-dom'

function Header (props) {
  return (
    <div>
      <Link to='/'>首页</Link> |<Link to='/about'>关于</Link> |
      {/* <Link to="/user">user</Link> | */}
      {/* <Link to="/zqd13kj">不存在</Link> | */}
    </div>
  )
}

export default Header
