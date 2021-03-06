import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Layout from '../components/Layout'
import ListingItem from '../components/ListingItem';
import Spinner from '../components/Spinner';
import { db } from '../firebase.config';

function Offer() {

    const params = useParams();
    const [listings, setListings] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchListings = async () => {
            try {

                const listingsRef = collection(db, "listings");

                const q = query(listingsRef, where('offer', '==', true), orderBy('timestamp', 'desc'), limit(10))
                const querySnapshot = await getDocs(q);

                const listings = [];

                querySnapshot.forEach((doc) => {
                    listings.push({
                        id: doc.id,
                        data: doc.data()
                    })
                });
                // console.log(listings);
                setListings(listings);
                setLoading(false);

            } catch (error) {
                toast.error("Could not fetch listings")
            }
        }

        fetchListings()
    },[]);

    return (
        <Layout>
            <h4 className='fw-bolder'>
                Offers
            </h4>
            {loading ? <Spinner /> : listings && listings.length > 0 ?
                <>
                    <div className='row'>
                        <div className="col-12 col-md-4">
                            {listings.map((listing) => (
                                <ListingItem key={listing.id} listing={listing.data} id={listing.id} />
                            ))}
                        </div>
                    </div>
                </>
                : <p>There is no for {params.categoryName == 'rent' ? 'rent' : 'sell'}  rignt now</p>}
        </Layout>
    )
}

export default Offer