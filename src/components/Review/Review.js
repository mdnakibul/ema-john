import React, { useEffect, useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif'
import { useHistory } from 'react-router';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        fetch('https://murmuring-falls-44571.herokuapp.com/productsByKeys', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productKeys)
        })
            .then(res => res.json())
            .then(data => {
                setCart(data);
                document.getElementById('loading-spinner').style.display = 'none'
                console.log(cart);
            })
            .catch(error => {
                console.log(error);
            })
        // const cartProducts = productKeys.map(key => {
        //     const product = fakeData.find(pd => pd.key === key);
        //     product.quantity = savedCart[key];
        //     return product;
        // });
        // setCart(cartProducts)
    }, []);

    const removeItem = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey)
        console.log('remove clicked', productKey)
        console.log('new cat', newCart)
    }

    const history = useHistory();
    const proceedCheckout = () => {
        // setCart([]);
        // setOrderPlaced(true);
        // processOrder();
        // console.log('Order placed')
        history.push('/shipment')

    }
    let thankyou;
    if (orderPlaced) {
        thankyou = <img src={happyImage} alt="" />
    }
    return (
        <div className="shop-container">
            <div className="product-container">
                <h1 style={{ marginBottom: '15px' }}>Item On Cart {cart.length} </h1>
                <div className="lds-ring m-auto" id="loading-spinner">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                {
                    cart.map(pd => <ReviewItem product={pd} key={pd.key} removeItem={removeItem}></ReviewItem>)
                }
                {thankyou}
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button className="adc-button" onClick={proceedCheckout}>Procced to checkout </button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;