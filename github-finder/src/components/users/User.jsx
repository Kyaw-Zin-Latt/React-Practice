import React, { useEffect, useContext } from 'react'
import { Link, useParams } from 'react-router-dom';
import GithubContext from '../../context/github/GithubContext';
import Layout from '../Layout'

function User() {

    const { getUser, users } = useContext(GithubContext);

    const params = useParams();

    useEffect(() => {
        getUser(params.login)
    }, [])

    return (
        <Layout>
            <Link to="/search" className='btn btn-ghost mb-4'>Go Back to Search</Link>
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div class="avatar">
                    <div class=" w-96 h-96 rounded-xl">
                        <img src={users.avatar_url} alt="" />
                    </div>
                </div>
                <div className="">
                    <h1 className=' text-3xl text-primary font-extrabold'>{users.name}</h1>
                </div>
            </div>
        </Layout>
    )
}

export default User