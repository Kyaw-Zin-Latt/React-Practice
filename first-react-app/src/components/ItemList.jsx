import React, { useContext } from 'react'
import FeedbackContext from '../context/FeedbackContext';
import Item from './Item'

function ItemList() {

    const {item} = useContext(FeedbackContext);

    return (
        <ul>
            {item.map(i => (
                <Item item={i} key={i.id} name={i.name} price={i.price} id={i.id}/>
            ))}
        </ul>
    )
}

export default ItemList