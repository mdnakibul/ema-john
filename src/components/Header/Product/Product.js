import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
const Product = (props) => {
    const { img, name, seller, price, stock } = props.product;
    return (
        <div className="product">
            <div className="product-image">
                <img src={img} alt={props.product.name} />
            </div>
            <div className="product-description">
                <h2>{name}</h2>
                <br />
                <p>by {seller}</p>
                <p>$ {price}</p>
                <p>{stock} in stock order soon</p>
                <button className="adc-button" onClick={() => props.handleAddProduct(props.product)}> <FontAwesomeIcon icon={faCartArrowDown} />
Add to cart</button>
            </div>

        </div>
    );
};

export default Product;