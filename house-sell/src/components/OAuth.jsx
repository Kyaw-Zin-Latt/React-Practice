import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import google from "../img/google.png"
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { db } from '../firebase.config';
import { toast } from 'react-toastify';


function OAuth() {

    const location = useLocation();
    const navigate = useNavigate();

    const handleGoogleAuth = async (e) => {
        e.preventDefault();
        try {
            const auth = getAuth();
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            //check for use
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
                await setDoc(doc(db, 'users', user.uid), {
                    name: user.displayName,
                    email: user.email,
                    createdAt: serverTimestamp()
                })
            }

            navigate('/')
        } catch (error) {
            toast.error("Could not authorize with Google")
        }

    }

    return (
        <div className="text-center my-2">
            <p>Sign {location.pathname === '/sign-up' ? 'up' : 'in'} with</p>
            <button onClick={handleGoogleAuth} className='btn btn-light border-primary p-0 rounded-circle shadow-lg'>
                <img src={google} className="p-2" style={{ width: '50px', height: '50px' }} alt="" />
            </button>
        </div>
    )
}

export default OAuth