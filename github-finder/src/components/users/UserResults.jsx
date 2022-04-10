import React, { useEffect, useContext } from 'react'
import GithubContext from '../../context/github/GithubContext';
import UserItem from './UserItem';

function UserResults() {

    const {users,loading,fetchUsers} = useContext(GithubContext);

    
    useEffect(() => {
       fetchUsers()
    }, []);


    
    if(!loading) {
        return (
            <div className='grid grid-cols-1 gap-8 xl:grid-cols-3 md:grid-cols-2 my-10'>
                {users.map((user) => (
                    <UserItem key={user.id} user={user} />
                ))}
            </div>
          )
    } else {
        return <h3>Loading ....</h3>
    }
 
}

export default UserResults