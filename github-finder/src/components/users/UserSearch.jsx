import React, { useState, useContext, useEffect } from 'react'
import GithubContext from '../../context/github/GithubContext';
import Layout from '../Layout'
import UserItem from './UserItem';

function UserSearch() {

    const { searchUsers, users,clearUser } = useContext(GithubContext);

    const [search, setSearch] = useState();

    const handleInput = (e) => {
        setSearch(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        searchUsers(search);
        setSearch("");
    }

    return (
        <Layout>
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={handleInput} value={search} placeholder="Type here" class="input input-bordered input-info w-full max-w-xs"></input>
                <button className='btn btn-primary ml-2'>Search</button>
            </form>
            <button onClick={clearUser} className='btn btn-ghost mt-1'>Clear</button>
            <div className='grid grid-cols-1 gap-8 xl:grid-cols-3 md:grid-cols-2 my-10'>
                {users.map((user) => (
                    <UserItem key={user.id} user={user} />
                ))}
            </div>
        </Layout>
    )
}

export default UserSearch