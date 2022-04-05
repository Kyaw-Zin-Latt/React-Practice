import { React, useContext, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import FeedbackContext from '../context/FeedbackContext';

function ItemForm({addItem}) {

    const {handleAdd, editItem, handleUpdate} = useContext(FeedbackContext);

    const [inputName, setName] = useState('');
    const [inputPrice, setPrice] = useState('');

    useEffect(() => {
        if(editItem.edit == true) {
            setName(editItem.item.name);
            setPrice(editItem.item.price);
        }
    },[editItem])

    const handleSubmit = (e) => {
        e.preventDefault()

        const newItem = {
            id: uuidv4(),
            name: inputName,
            price: inputPrice
        }
        if (editItem.edit == true) {
            handleUpdate(editItem.item.id, newItem)
            setName('');
            setPrice('');
            editItem.edit = false
        } else {
            handleAdd(newItem)
            setName('');
            setPrice('');
        }
        
        


    }

    const handleChangeName = (e) => {
        setName(e.target.value);
        
    }

    const handleChangePrice = (e) => {
        setPrice(e.target.value)
    }

    return (
        <form>
            <input type="text" value={inputName} onChange={handleChangeName} />
            <input type="text" value={inputPrice} onChange={handleChangePrice} />
            <button onClick={handleSubmit}>Add</button>
        </form>
    )
}

export default ItemForm