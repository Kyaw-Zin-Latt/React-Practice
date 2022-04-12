import React, { useRef } from 'react'

function UseRefExample1() {

    const name = useRef()

    const onSubmit = (e) => {
        e.preventDefault()
        return name.current.focus();
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <label htmlFor="name">Name</label>
                <input type="text" ref={name} id='name'  />
                <p onClick={() => name.current.focus()}>Hi</p>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default UseRefExample1