import { render } from '@testing-library/react';
import React, { useEffect, useRef, useState } from 'react'

function Todo() {

    const [number, setNumber] = useState(1);
    const [inc, setInc] = useState(0);

    const renders = useRef(1)

    // console.log(renders.current);

    useEffect(() => {
        
        renders.current = renders.current + 1;
        
    });
    
    return (
        <div>
            <input type="number" value={number} onChange={(e) => (setNumber(e.target.value))} />
            <h3>Renders : {renders.current}</h3>
        </div>
    )
}

export default Todo