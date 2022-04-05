import React from 'react'

function Header(props) {
  return (
    <h2 className={`fw-bolder ${props.color}`}>{props.title}</h2>
  )
}

export default Header