import React, { useState } from 'react'

function App (props) {
  const [count, setCount] = useState(0)
  return (
    <>
      <h1>
        {props.title}!{count}
      </h1>
      <button
        onClick={() => {
          setCount(count + 1)
        }}
      >
        ++
      </button>
    </>
  )
}

export default <App title='开课吧'></App>
