import React from 'react'

function Button(props) {
  return (
    <button onClick={props.click} className={`btn btn-${props.color}`}>{props.text}</button>
  )
}

export default Button