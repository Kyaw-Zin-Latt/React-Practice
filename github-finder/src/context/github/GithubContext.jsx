import React, { createContext, useState } from 'react'

const GithubContext = createContext();
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true)

    const fetchUsers = async () => {

        const response = await fetch(`${GITHUB_URL}/users`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
            },
        })

        const data = await response.json()

        setUsers(data);
        setLoading(false);

    }

    const searchUsers = async (text) => {

        const param = new URLSearchParams({
            q: text
        })

        const response = await fetch(`${GITHUB_URL}/search/users?${param}`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
            },
        })

        const { items } = await response.json()

        setUsers(items);
        setLoading(false);

        console.log(users);

    }

    const getUser = async (login) => {

        const response = await fetch(`${GITHUB_URL}/users/${login}`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
            },
        })

        if (response.status === 404) {

            window.location = "/notfound"

        } else {

            const data = await response.json()

            setUsers(data);
            setLoading(false);

            console.log(data);

        }

    }

    const clearUser = () => {
        setUsers([]);
    }

    return <GithubContext.Provider value={{
        users,
        loading,
        fetchUsers,
        searchUsers,
        clearUser,
        getUser
    }}>
        {children}
    </GithubContext.Provider>


}

export default GithubContext;