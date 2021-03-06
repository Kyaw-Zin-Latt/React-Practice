import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OAuth from '../components/OAuth';

function SignIn() {

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    const { email, password } = form;



    const onChange = (e) => {

        setForm((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                // console.log(userCredential);
                navigate("/");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
                toast.error("Your Email or Password is wrong!")
            });


    }

    const handleShowPwd = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div className="container">
            <div className="row my-5">
                <div className="col-12 col-md-5">

                    <h4 className='fw-bolder mb-3'>Welcome Back</h4>

                    <form onSubmit={handleSubmit}>


                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">
                                <i className='fas fa-user'></i>
                            </span>
                            <input type="text" id='email' class="form-control" value={email} onChange={onChange} placeholder="Email" aria-label="Email" aria-describedby="basic-addon1" />
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">
                                <i className='fas fa-lock'></i>
                            </span>
                            <input type={showPassword ? 'text' : 'password'} id="password" class="form-control" value={password} onChange={onChange} aria-label="Amount (to the nearest dollar)" />
                            <span class="input-group-text" onClick={handleShowPwd}>
                                <i className='fas fa-eye'></i>
                            </span>
                        </div>

                        <div className="my-4">
                            <NavLink className="text-primary" to='/forgot-password'>Forgot Password</NavLink>
                        </div>

                        <div className="d-flex justify-content-between align-items-center">
                            <p className='fw-bolder mb-0'>Sign In</p>
                            <button type='submit' className='btn btn-primary btn-circle'>
                                <i className='fas fa-arrow-right'></i>
                            </button>
                        </div>
                    </form>

                    <OAuth />

                    <div className="text-center my-5">
                        <NavLink to="/sign-up" className="text-primary fw-bolder">Sign Up Instead</NavLink>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default SignIn