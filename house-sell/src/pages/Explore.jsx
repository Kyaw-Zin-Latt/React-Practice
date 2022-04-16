import React from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import rentImgCat from '../img/house1.jpg'
import sellImgCat from '../img/house2.jpg'

function Explore() {
    return (
        <Layout>
            <div className="">
                <p className='fw-bolder'>Categories</p>
                <div className="row">
                    <div className="col-6 col-md-3">
                        <Link to={'/category/rent'}>
                            <img src={rentImgCat} alt="rent" style={{height : '120px'}} className='w-100 img-fluid rounded' />
                        </Link>
                        <p>Places for rent</p>
                    </div>
                    <div className="col-6 col-md-3">
                        <Link to={'/category/sale'}>
                            <img src={sellImgCat} alt="sell" style={{height : '120px'}} className='w-100 img-fluid rounded' />
                        </Link>
                        <p>Places for sell</p>
                    </div>
                   
                </div>
            </div>
        </Layout>
    )
}

export default Explore