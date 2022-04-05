import React, { useContext } from 'react'
import FeedbackContext from '../context/FeedbackContext';

function Table() {

    const { item } = useContext(FeedbackContext);

    //cal each item total number
    const itemTotal = (price, quantity) => {
        let value = price * quantity;
        return value;
    }

    //cal final total number
    const finalTotal = () => {
        let eachItemTotal = [];
        let value = item.map(i => (eachItemTotal.push(i.price * i.quantity)));
        let finalValue = eachItemTotal.reduce((total, num) => (total + num))
        return finalValue;
    }

    return (
        <div className="my-3 table-responsive">
            <table className='table table-bordered border-primary'>
                <thead>
                    <tr className='bg-primary'>
                        <th>Item</th>
                        <th>Price</th>
                        <th>Control</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {item.map(e => (
                        <tr key={e.id}>
                            <td className='text-primary'>{e.name}</td>
                            <td className='text-primary'>{e.price}</td>
                            <td className='text-primary'>{e.quantity}</td>
                            <td className='text-primary'>{itemTotal(e.price, e.quantity)}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan='3' className='bg-primary'>
                            Total
                        </td>
                        <td className='text-primary'>
                            {finalTotal()}
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default Table