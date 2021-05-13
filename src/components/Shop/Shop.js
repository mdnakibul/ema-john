import React, { useEffect, useState } from 'react';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { Link } from 'react-router-dom';
const Shop = () => {
    // const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('https://murmuring-falls-44571.herokuapp.com/products')
            .then(result => result.json())
            .then(data => {
                setProducts(data)
                document.getElementById('loading-spinner').style.display = 'none'
            })
    }, [])

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
                console.log(cart);
            })
            .catch(error => {
                console.log(error);
            })

    }, [])

    const handleAddProduct = (product) => {
        const sameProduct = cart.find(pd => pd.key === product.key);
        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== product.key);
            newCart = [...others, sameProduct]
        } else {
            product.quantity = 1;
            newCart = [...cart, product];
        }

        setCart(newCart);
        addToDatabaseCart(product.key, count);

    }
    return (
        <div className="shop-container">
            <div className="product-container">

                <div className="input-group m-auto" style={{maxWidth : '300px'}}>
                    <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search"
                        aria-describedby="search-addon" />
                    <button type="button" className="btn btn-primary">search</button>
                </div>

                <h2 style={{ marginBottom: '15px' }}>Product List</h2>
                <div className="lds-ring m-auto" id="loading-spinner">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                {
                    products.map(product => <Product product={product} handleAddProduct={handleAddProduct} key={product.key} showAddToCart={true}></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to={"/review"}>
                        <button className="adc-button">Review Order</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;