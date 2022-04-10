import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div>
        <h2 className='text-primary text-2xl'>404 Not Found</h2>
        <Link to="/" className='btn btn-primary btn-outline'>Go To Home</Link>
    
    </div>
  )
}

export default NotFound