import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
    return (
        <div className='d-flex justify-content-center align-items-center' style={{ height : '100vh' }}>
            <div className="card bg-secondary">
                <div className="card-body">
                    <h2 className='text-primary mb-4'>404 Not Found</h2>
                    <button className='btn btn-primary w-100'>
                        <Link to="/" className='text-dark'>Go to Home Page</Link>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NotFound