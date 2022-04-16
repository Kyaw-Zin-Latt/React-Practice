import React from 'react'
import { Link } from 'react-router-dom'

function ListingItem({ listing, id }) {
    return (
        <div key={id} className="card">
            <img src={listing.imageUrls[0]} className="card-img-top" alt="rent" />
            <div className="card-body">
                <h5 className="card-title">{listing.name}</h5>
                <p className="card-text">
                    <i className='fas fa-map-marked text-primary'></i> {listing.location ? listing.location : listing.address }
                </p>
                <h5 className='text-primary fw-bolder '>
                    ${listing.offer ? listing.discountedPrice : listing.regularPrice} {listing.type === 'rent' && ' / month'}
                </h5>
                <div className="d-flex justify-content-between align-items-center my-3">
                    <small>
                        <i className='fas fa-bed text-primary me-2'></i>
                        {listing.bedrooms > 1 ? listing.bedrooms : 1} Bedrooms
                    </small>
                    <small>
                        <i className='fas fa-bath text-primary me-2'></i>
                        {listing.bathrooms > 1 ? listing.bathrooms : 1} Bathrooms
                    </small>
                </div>
                <Link to={`/category/${listing.name}/${id}`} className="btn btn-primary">Detail</Link>
            </div>
        </div>
    )
}

export default ListingItem