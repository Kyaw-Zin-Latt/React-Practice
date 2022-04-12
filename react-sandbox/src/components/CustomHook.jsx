import React from 'react'
import useFetch from '../hooks/useFetch'

function CustomHook() {

    const {loading,data} = useFetch('https://jsonplaceholder.typicode.com/posts', {});
    console.log(data);

    if (loading) {
        return <h2>Loading ...</h2>
    } else {

        return (

            <div>
                {data.map((post,index) => (
                    <p key={index}>{post.title}</p>
                ))}
            </div>
        )
    }
}

export default CustomHook