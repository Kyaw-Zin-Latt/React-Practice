import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'

function Layout(props) {
  return (
    <div className='flex flex-col justify-between h-screen'>
        <Navbar />
       
            <div className="container">
                {props.children}
            </div>

        <Footer />

    </div>
  )
}

export default Layout