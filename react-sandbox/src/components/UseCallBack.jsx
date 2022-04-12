import React, { useCallback, useState } from 'react'

function UseCallBack() {

    const [tasks, setTasks] = useState([]);

    const addTask = useCallback(() => {
        setTasks((prevState) =>
            [...prevState, 'Some Task']
        )
    }, [setTasks])



    return (
        <div>
            <Button addTask={addTask} />

            {tasks.map((val, index) => (
                <p key={index}>{val}</p>
            ))}

        </div>
    )
}

const Button = React.memo(({ addTask }) => {
    console.log('Button rendered');

    return  <button onClick={addTask}>Click</button>


})

export default UseCallBack