import React, { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { db } from "../firebase.config"
import { Navigate, NavLink, useNavigate } from 'react-router-dom'
import { async } from '@firebase/util';


function SignUp() {

    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    })

    const { email, password, name } = form;

    const onChange = (e) => {

        setForm((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const auth = getAuth();
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            updateProfile(auth.currentUser, {
                displayName: name
            })

            navigate("/");



        } catch (error) {
            console.log(error);
        }

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
                                <i className='fas fa-name'></i>
                            </span>
                            <input type="text" id='name' class="form-control" value={name} onChange={onChange} placeholder="Name" aria-label="Name" aria-describedby="basic-addon1" />
                        </div>

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
                            <p className='fw-bolder mb-0'>Sign Up</p>
                            <button type='submit' className='btn btn-primary btn-circle'>
                                <i className='fas fa-arrow-right'></i>
                            </button>
                        </div>
                    </form>

                    <div className="text-center my-5">
                        <NavLink to="/sign-in" className="text-primary fw-bolder">Sign In Instead</NavLink>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default SignUp