import React, { useState } from 'react'

function Index (props) {
  const [count, setCount] = useState(0)
  return (
    <>
      <h1>
        hello {props.title}!{count}
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
export default Index
