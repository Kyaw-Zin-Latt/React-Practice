import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from 'react-toastify';

function ForgotPassword() {

  const [email, setEmail] = useState('');

  const onChange = (e) => {
    setEmail(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email)
      toast.success('Email was sent')
    } catch (error) {
      toast.error('Could not send reset Email')
    }
  }


  return (
    <div className='container'>
      <div className="row">
        <div className="col-12 col-md-5">
          <h4 className='fw-bolder'>Forgot Password</h4>
          <div className="">
            <form onSubmit={handleSubmit}>
              <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">
                  <i className='fas fa-user'></i>
                </span>
                <input type="text" id='email' class="form-control" value={email} onChange={onChange} placeholder="Email" aria-label="Email" aria-describedby="basic-addon1" />
              </div>
              <div className="my-4">
                <NavLink className="text-primary" to='/sign-in'>Sign In</NavLink>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p className='fw-bolder mb-0'>Send Reset Link</p>
                <button type='submit' className='btn btn-primary btn-circle'>
                  <i className='fas fa-arrow-right'></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

    </div>
  )
}

export default ForgotPassword