import React from 'react'

function Layout(props) {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8 col-xl-6 col-12">
          <div className='text-center'>
            {props.children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout