import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getIndexList } from '../store/index'
import styles from './Index.css'

function Index (props) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!props.list.length) {
      props.getIndexList()
    }
  }, [])

  return (
    <>
      <h1 className={styles.title}>
        哈喽 {props.title} ! {count}
      </h1>

      <button
        onClick={() => {
          setCount(count + 1)
        }}
      >
        ++
      </button>
      <hr />
      <ul>
        {props.list.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </>
  )
}

Index.loadData = store => {
  return store.dispatch(getIndexList())
}

export default connect(state => ({ list: state.index.list }), { getIndexList })(
  Index
)
