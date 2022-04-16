import React, { useEffect, useState } from 'react'
import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase.config';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import Spinner from '../components/Spinner';
import Layout from '../components/Layout';
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function Listing() {


    const [listing, setListing] = useState(null)
    const [loading, setLoading] = useState(true)
    const [shareLinkCopy, setShareLinkCopy] = useState(null)



    const params = useParams();
    const navigate = useNavigate();
    const auth = getAuth();


    useEffect(() => {

        const fetchListing = async () => {
            const docRef = doc(db, "listings", params.listingId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log(docSnap.data());
                setListing(docSnap.data());
                console.log(listing);
                setLoading(false)
            }
        }

        fetchListing()

    }, [navigate, params.listingId])


    if (loading) {
        return <Spinner />
    }


    return (

        <Layout>

            <p>{listing.name}</p>

            <Swiper
                // install Swiper modules
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                slidesPerView={1}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
            >

                {listing.imageUrls.map((img, index) => (
                    <SwiperSlide key={index} className="">
                        <a class="veno" data-gall="gallery01" href={img}>
                            <img style={{ width: '100%', height: '200px', objectFit: 'cover' }} src={img} alt="" />
                        </a>
                    </SwiperSlide>
                ))}


            </Swiper>

            <img src="" alt="" />

        </Layout>
    )
}

export default Listing