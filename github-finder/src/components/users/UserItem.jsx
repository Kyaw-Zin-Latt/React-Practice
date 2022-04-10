import React from 'react'
import { Link } from 'react-router-dom'

function UserItem({ user }) {
    return (
        <Link to={`/users/${user.login}`} className='card shadow-md compact side bg-primary text-primary-content duration-700 hover:bg-base-content hover:cursor-pointer'>
            <div className="flex-row items-center space-x-4 card-body">
                <div className="">
                    <div class="avatar">
                        <div class="w-14 h-14 shadow rounded-full">
                            <img src={user.avatar_url} />
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className='card-title'>{user.login}</h2>
                    <Link className='text-primary-content text-opacity-80' to={`/users/${user.login}`}>
                        Visit Profile
                    </Link>
                </div>
            </div>

        </Link>
    )
}

export default UserItem