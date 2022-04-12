import React, { useEffect, useRef } from 'react'

function UseRefExample2() {

    const name = useRef();


    const onChange = () => {
        console.log(name.current.value);
        return name.current.value;
    }

    useEffect(() => {
        
    }, []);

    return (
        <div>
            <input type="text" onChange={onChange} ref={name} />
        </div>
    )
}

export default UseRefExample2