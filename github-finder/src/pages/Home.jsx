import React from 'react'
import Layout from '../components/Layout'
import Navbar from '../components/Navbar'
import UserResults from '../components/users/UserResults'


function Home() {
    return (
        <Layout>
            <UserResults />
        </Layout>
    )
}

export default Home