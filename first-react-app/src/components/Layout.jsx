import React from 'react'
import { Link } from "react-router-dom";

function Layout(props) {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8 col-xl-6 col-12">
          <div className='text-center'>
            <Link to="/" activeClassName="active">Home</Link> |
            <Link to="/about">About</Link>
    

            {props.children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout