import React, { useState } from 'react'
import Layout from '../components/Layout'
import { getAuth, updateProfile } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import { updateDoc, doc } from 'firebase/firestore'
import { db } from '../firebase.config'


function Profile() {

    const auth = getAuth();
    const navigate = useNavigate();

    const [changeDetail, setChangeDetail] = useState(false);
    const [form, setForm] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email
    })

    const { name, email } = form;

    const handleLogout = () => {
        auth.signOut();
        navigate("/sign-in");
    }

    const handleChangeProfile = async () => {
        // console.log('change profile');
        try {
            if (auth.currentUser.displayName !== name) {
                await updateProfile(auth.currentUser, {
                    displayName: name
                })

                const userRef = doc(db, "users", auth.currentUser.uid);
                await updateDoc(userRef, {
                    name,
                    email
                })
            }
        } catch (error) {

        }
    }

    const handleChange = (e) => {
        setForm((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }

    return (
        <Layout>
            <div className="container">
                <div className="row my-3">
                    <div className="col-12">
                        <div className="d-flex justify-content-between align-items-center post">
                            <h4 className='fw-bolder post'>My Profile</h4>
                            <button className='btn btn-primary rounded-pill' onClick={handleLogout}>Logout</button>
                        </div>
                        <div className="d-flex justify-content-between mt-3">
                            <p>Personal Details</p>
                            <p className='text-primary fw-bolder'
                                onClick={() => {
                                    changeDetail && handleChangeProfile()
                                    setChangeDetail((prevState) => !prevState)
                                }}
                            >
                                {changeDetail ? 'done' : 'change'}
                            </p>
                        </div>
                        <div className="card">
                            <div className="card-body">
                                <form>
                                    <div className="mb-2">
                                        <input type="text" id='name' value={name} onChange={handleChange} disabled={!changeDetail} className='form-control' />
                                    </div>
                                    <div className="">
                                        <input type="email" id='email' value={email} onChange={handleChange} disabled={!changeDetail} className='form-control' />
                                    </div>
                                </form>
                            </div>
                        </div>
                        <Link to={'/create-listing'} className='btn btn-outline-primary w-100 mt-3'>
                            <div className="d-flex justify-content-between align-items-center">
                                <i className='fas fa-home'></i>
                                <p className='mb-0'>Sell or rent your home</p>
                                <i className='fas fa-arrow-alt-circle-right'></i>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Profile