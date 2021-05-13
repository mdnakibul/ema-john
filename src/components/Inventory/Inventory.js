import React from 'react';
import fakeData from '../../fakeData';

const Inventory = () => {
    const handleAddProduct = ()=>{
        fetch('https://murmuring-falls-44571.herokuapp.com/addProduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fakeData)
        })
        .then(function(){
            console.log('Connection ok');
        })
        .catch(function(){
            console.log('Failed');
        })
    }
    return (
        <div>
            <button onClick={handleAddProduct}>Add Product </button>
        </div>
    );
};

export default Inventory;