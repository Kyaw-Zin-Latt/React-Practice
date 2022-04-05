import React, { useContext, useState } from 'react'
import Button from './Button';
import { v4 as uuidv4 } from 'uuid';
import FeedbackContext from '../context/FeedbackContext';

function Form() {
    const { itemList, handleAdd } = useContext(FeedbackContext);
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState();
    const [id, setId] = useState('0');
    const [name, setName] = useState();
    const [value, setValue] = useState();


    // quantity input


    // item input
    const inputItem = (e) => {
        if (e.target.value === "0") {
            alert("Please Select something");
        }
        // console.log(value);
        setId(e.target.value);
        console.log(id);
        const currentId = Number(id)
        let data = itemList.filter(i => (i.id !== currentId));
        setValue(data);
        console.log(data[0].name);
        if (id) {
            setName(data[0].name);
            setPrice(data[0].price);
        }
    }

    const inputQuantity = (e) => {
        setQuantity(e.target.value);
        console.log(quantity);
    }

    // add new Item
    const handleSubmit = (e) => {
        e.preventDefault();


        const newItem = {
            name,
            price,
            quantity
        }
        newItem.id = uuidv4();

        handleAdd(newItem)

        console.log(newItem);
    }



    return (
        <form className='row g-2'>
            <div className="col">
                <select className="form-select" value={id} onChange={inputItem} aria-label="Default select example">
                    <option value="0">Open this select menu</option>
                    {itemList.map(i => (
                        <option key={i.id} value={i.id}>{i.name}</option>
                    ))}
                </select>
            </div>
            <div className="col">
                <input className='form-control' value={quantity} onChange={inputQuantity} />
            </div>
            <div className="col-auto">
                <Button text="Add" click={handleSubmit} color="primary" />
            </div>
        </form>
    )
}

export default Form