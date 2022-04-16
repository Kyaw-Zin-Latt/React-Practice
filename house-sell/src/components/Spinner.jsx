import React from 'react'

function Spinner() {
    return (
        <div style={{ height: '100vh' }} className='d-flex justify-content-center align-items-center'>
            <div className="spinner-border text-primary " style={{ width: "3rem", height: "3rem", }} role="status">

            </div>
        </div>
    )
}

export default Spinner