import React, { useEffect, useRef, useState } from 'react'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import Layout from '../components/Layout'
import { toast } from 'react-toastify';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; 
import {db} from '../firebase.config'
import { v4 as uuidv4 } from 'uuid'

function CreateListing() {

    const [geolocationEnabled, setGeolocationEnabled] = useState(false)
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        type: 'rent',
        name: '',
        bedrooms: 1,
        bathrooms: 1,
        parking: false,
        furnished: false,
        address: '',
        offer: false,
        regularPrice: 0,
        discountedPrice: 0,
        images: {},
        latitude: 0,
        longitude: 0
    });

    const { type, name, bedrooms, bathrooms, parking, furnished, address, offer, regularPrice, discountedPrice, images, latitude, longitude } = form;

    const auth = getAuth();
    const isMounted = useRef(true);
    const navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setForm({ ...form, userRef: user.uid })
            } else {
                navigate('/sign-in')
            }
        })

        return () => {
            isMounted.current = false;
        }

    }, [isMounted])


    if (loading) {
        return <Spinner />
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log(form);

        if (discountedPrice >= regularPrice) {
            setLoading(false)
            toast.error('Discounted price needs to be less than regular price')
            return
        }

        let geolocation = {};
        let location

        if (geolocationEnabled) {
            const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyAnbni5dNUQofGghLMBKhNWWaG6JlRD1Vo`)
            const data = await response.json();
            console.log(data);
        } else {
            geolocation.lat = latitude;
            geolocation.lng = longitude;
            location = address
        }

        // Store images in firebase

        const storeImage = async (image) => {
            return new Promise((resolve, reject) => {
                const storage = getStorage();
                const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`
                const storageRef = ref(storage, 'images/' + fileName)
                const uploadTask = uploadBytesResumable(storageRef, image);

                uploadTask.on('state_changed',
                    (snapshot) => {
                       
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                        switch (snapshot.state) {
                            case 'paused':
                                console.log('Upload is paused');
                                break;
                            case 'running':
                                console.log('Upload is running');
                                break;
                        }
                    },
                    (error) => {
                        reject(error)
                    },
                    () => {
                        // Handle successful uploads on complete
                        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            resolve(downloadURL);
                        });
                    }
                );

            })
        }

        const imageUrls = await Promise.all(
            [...images].map((image) => storeImage(image))
        ).catch(() => {
            setLoading(false)
            toast.error('Images not uploaded')
            return
        })

        // console.log(imageUrls);
        const formDataCopy = {
            ...form,
            imageUrls,
            geolocation,
            timestamp: serverTimestamp()
        
        }

        delete formDataCopy.images
        !formDataCopy.offer && delete formDataCopy.discountedPrice

        const docRef = await addDoc(collection(db, 'listings'), formDataCopy)

        setLoading(false);
        toast.success("Listing add successfully")

        navigate(`/category/${formDataCopy.type}/${docRef.id}`)

    }

    const onMutate = (e) => {
        let boolean = null;

        if (e.target.value === 'true') {
            boolean = true;
        }

        if (e.target.value === 'false') {
            boolean = false;
        }

        if (e.target.files) {
            setForm((prevState) => ({ ...prevState, images: e.target.files }))
        }

        if (!e.target.files) {
            setForm((prevState) => ({
                ...prevState,
                [e.target.id]: boolean ?? e.target.value
            }))
        }

    }

    return (
        <Layout>
            <div className="row">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h4 className='fw-bolder'>Create a Listing</h4>
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="" className=''>Sell / Rent</label>
                                <div className="d-flex">
                                    <button value="sale" id='type' onClick={onMutate} type='button' className={"btn me-2 " + (type == 'sale' ? 'btn-primary' : 'btn-light')}>Sell</button>
                                    <button value="rent" id='type' onClick={onMutate} type='button' className={"btn " + (type == 'rent' ? 'btn-primary' : 'btn-light')}>Rent</button>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="" className=''>Name</label>
                                    <input value={name} id='name' onChange={onMutate} type='text' className="form-control" required minLength='10' maxLength='32' />
                                </div>

                                <div className="d-flex mb-3">
                                    <div className="me-2">
                                        <label htmlFor="" className=''>Bedrooms</label>
                                        <input value={bedrooms} id='bedrooms' onChange={onMutate} type='number' className="form-control" required min='10' max='32' />
                                    </div>
                                    <div className="">
                                        <label htmlFor="" className=''>Bathrooms</label>
                                        <input value={bathrooms} id='bathrooms' onChange={onMutate} type='number' className="form-control" required min='10' max='32' />
                                    </div>
                                </div>

                                <label htmlFor="" className='mb-3'>Parking spot</label>
                                <div className="d-flex">
                                    <button value={true} id='parking' onClick={onMutate} type='button' className={"btn me-2 " + (parking ? 'btn-primary' : 'btn-light')}>Yes</button>
                                    <button value={false} id='parking' onClick={onMutate} type='button' className={"btn " + (!parking && parking !== null ? 'btn-primary' : 'btn-light')}>No</button>
                                </div>

                                <label htmlFor="" className='mb-3'>Furnished</label>
                                <div className="d-flex">
                                    <button value={true} id='furnished' onClick={onMutate} type='button' className={"btn me-2 " + (furnished ? 'btn-primary' : 'btn-light')}>Yes</button>
                                    <button value={false} id='furnished' onClick={onMutate} type='button' className={"btn " + (!furnished && furnished !== null ? 'btn-primary' : 'btn-light')}>No</button>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="" className=''>Address</label>
                                    <textarea value={address} id='address' onChange={onMutate} type='text' className="form-control" required minLength='10' maxLength='32' />
                                    {!geolocationEnabled && (
                                        <div className="d-flex mb-3">
                                            <div className="me-2">
                                                <label htmlFor="" className=''>latitude</label>
                                                <input value={latitude} id='latitude' onChange={onMutate} type='number' className="form-control" required min='10' max='32' />
                                            </div>
                                            <div className="">
                                                <label htmlFor="" className=''>longitude</label>
                                                <input value={longitude} id='longitude' onChange={onMutate} type='number' className="form-control" required min='10' max='32' />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <label htmlFor="" className='mb-3'>Offer</label>
                                <div className="d-flex">
                                    <button value={true} id='offer' onClick={onMutate} type='button' className={"btn me-2 " + (offer ? 'btn-primary' : 'btn-light')}>Yes</button>
                                    <button value={false} id='offer' onClick={onMutate} type='button' className={"btn " + (!offer && offer !== null ? 'btn-primary' : 'btn-light')}>No</button>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="" className=''>Regular Price</label>
                                    <div className="d-flex align-items-center">
                                        <input value={regularPrice} id='regularPrice' onChange={onMutate} type='number' className="form-control d-inline" required minLength='10' maxLength='32' />
                                        {type === 'rent' && (
                                            <small className='fw-bolder text-nowrap'>$ / Month</small>
                                        )}
                                    </div>
                                </div>
                                {offer && (
                                    <>
                                        <div className="mb-3">
                                            <label htmlFor="" className=''>Discount Price</label>
                                            <div className="d-flex align-items-center">
                                                <input value={discountedPrice} id='discountedPrice' onChange={onMutate} type='number' className="form-control" required />
                                            </div>
                                        </div>
                                    </>
                                )}
                                <div className="mb-3">
                                    <label htmlFor="" className=''>Images</label>
                                    <input id='images' onChange={onMutate} type='file' className="form-control" required multiple />
                                </div>
                                <button type='submit' className='btn btn-primary w-100 mb-3'>Create Listing</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateListing