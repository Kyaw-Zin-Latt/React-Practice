import React, { useContext } from 'react'
import FeedbackContext from '../context/FeedbackContext';

function Item({name,price,id,currentId,item}) {

    const {handleDelete,handleEdit} = useContext(FeedbackContext);

    return (
      <li>
          { name } | { price }
          <button onClick={() => handleDelete(id)}>Del</button>
          <button onClick={() => handleEdit(item)}>Edit</button>
      </li>
    )
  }

export default Item