import React, { useEffect, useState } from 'react';
import {getDatabaseCart, processOrder, removeFromDatabaseCart} from '../../utilities/databaseManager';
import fakeData from '../../fakeData'
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif'

const Review = () => {
   const[cart,setCart] = useState([]);
   const[orderPlaced,setOrderPlaced] = useState(false);
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        });
        setCart(cartProducts)
    },[]);
    
    const removeItem = (productKey) =>{
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey)
        console.log('remove clicked',productKey)
        console.log('new cat',newCart)
    }

    const placeOrder = () =>{
        setCart([]);
        setOrderPlaced(true);
        processOrder();
        console.log('Order placed')
    }
    let thankyou;
    if(orderPlaced){
        thankyou = <img src={happyImage} alt=""/>
    }
    return (
        <div className="shop-container">
            <div className="product-container">
            <h1>Item On Cart {cart.length} </h1>
            {
                cart.map(pd => <ReviewItem product={pd} key={pd.key} removeItem={removeItem}></ReviewItem>)
            }
            {thankyou}
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button className="adc-button" onClick={placeOrder}>Place Order </button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;