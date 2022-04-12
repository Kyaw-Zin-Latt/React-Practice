import React from 'react'
import Nav from './Nav'

function Layout({children}) {
    return (
        <div className='container-fluid'>
            <div className="row">
                <div className="col-12">
                    <Nav />
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Layout