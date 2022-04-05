import { createContext, useState } from "react";
import {itemDate,itemList} from "../data/ItemData";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {

    const [item, setItem] = useState(itemDate);
    const [editItem, setEditItem] = useState({
        item : {},
        edit : false
    });

    const handleAdd = (newItem) => {
        setItem([newItem, ...item]);
    }

    const handleDelete = (id) => {
        let itemList = item.filter(e => e.id !== id)
        setItem(itemList)
    }

    const handleUpdate = (id,updateItem) => {
        // console.log(updateItem)
        setItem(item.map((item) => (item.id === id ? {...item,...updateItem} : item)))
        // console.log(value);
    }

    const handleEdit = (item) => {
        // let Edititem = item.filter(e => e.id == id)
        setEditItem({
            item,
            edit : true,
        })
    }


    return (
        <FeedbackContext.Provider value={{ itemList,item, editItem, handleDelete, handleAdd, handleEdit, handleUpdate }}>
            {children}
        </FeedbackContext.Provider>
    )
}

export default FeedbackContext;