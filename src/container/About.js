import React from 'react'
import styles from './About.css'
// import Helmet from 'react-helmet'
function About (props) {
  return (
    <div>
      {/* <Helmet>
        <title>SSR 关于页面</title>
        <meta name='keywords' content='关于我自己' />
        <meta name='description' content='一个帅哥 ' />
      </Helmet> */}
      <h1 className={styles.title}>登录页面</h1>
    </div>
  )
}
export default About
