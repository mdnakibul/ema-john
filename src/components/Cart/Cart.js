import React from 'react';

const Cart = (props) => {
    console.log(props.cart);
    const cart = props.cart;
    const total = cart.reduce((total,prd) => total + prd.price, 0);
    let shipping = 0;
    if(total > 35){
        shipping = 0;
    }else if(total > 15){
        shipping = 4.99;
    }else if(total > 0){
        shipping = 12.99
    }

    let tax = (total / 10).toFixed(2);
    let grandTotal = (total + shipping + Number(tax)).toFixed(2);
    return (
        <div>
            <h2>Order Summery</h2>
            <p>Items Ordered : {props.cart.length}</p>
            <p>Item Price = {total}</p>
            <p><small>Shipping Cost : {shipping}</small></p>
            <p><small>VAT + Tax : {tax}</small></p>
            <p>Total Price : {grandTotal}</p>
        </div>
    );
};

export default Cart;