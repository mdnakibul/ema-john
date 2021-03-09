import React from 'react';

const ReviewItem = (props) => {
    const {name, quantity,key,price} = props.product;
    const reviewItemStyle = {
        marginBotton:'20px',
        borderBottom:'1px solid #ddd',
        padding:'5px',
        marginLeft:'200px'
    }
    return (
        <div className="review-item" style={reviewItemStyle}>
            <h2>{name}</h2>
            <p>Quantity : {quantity}</p>
            <p><small>$ {price}</small></p>
            <button className="adc-button" onClick={() => props.removeItem(key)}>Remove Item</button>
        </div>
    );
};

export default ReviewItem;