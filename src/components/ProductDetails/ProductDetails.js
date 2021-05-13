import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product'
const ProductDetals = () => {
    const {productKey} = useParams();
    const [product,setProduct] = useState([]);

    useEffect(()=>{
        fetch('https://murmuring-falls-44571.herokuapp.com/product/'+productKey)
        .then(res => res.json())
        .then(data => setProduct(data))
    },[productKey]);
    return (
        <div>
            <h1>Product details : </h1>
            <Product product={product} showAddToCart={false}></Product>
        </div>
    );
};

export default ProductDetals;