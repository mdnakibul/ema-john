import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContex } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import ProcessPayment from '../ProcessPayment/ProcessPayment';
import './Shipment.css'

const Shipment = () => {
  const { register, handleSubmit, errors } = useForm();
  const [loggedInUser] = useContext(UserContex);
  const savedCart = getDatabaseCart();
  const [shipmentData,setShipmentData] = useState(null)
  const onSubmit = data => {
    setShipmentData(data);
  };

  const handlePaymentSuccess = (paymentId) =>{
    const orderInfo = { ...loggedInUser, product: savedCart, address: shipmentData, paymentId, orderTime: new Date() };

    fetch('https://murmuring-falls-44571.herokuapp.com/addOrder',{
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json',
      },
      body : JSON.stringify(orderInfo)
    })
    .then(res => res.json())
    .then(data => {
      if(data){
        alert('Order placed successfully')
        processOrder()
      }
    })
  }

  return (
    <div className="container">
      <div className="row">
        <div style={{display : shipmentData ? 'none' : 'block'}} className="col-md-6">
          <form onSubmit={handleSubmit(onSubmit)} className="shipping-form">    {/* include validation with required or other standard HTML validation rules */}

            <input name="name" type="text" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder="Enter Your Name" />
            {/* errors will return when field validation fails  */}
            {errors.name && <span>Name is required</span>}

            <input name="email" type="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder="Enter Your Email" />
            {/* errors will return when field validation fails  */}
            {errors.email && <span>Email is required</span>}

            <input name="address" type="text" ref={register({ required: true })} placeholder="Enter Your Address" />
            {/* errors will return when field validation fails  */}
            {errors.address && <span>Address is required</span>}

            <input name="phone" type="tel" ref={register({ required: true })} placeholder="Enter Your Phone" />
            {/* errors will return when field validation fails  */}
            {errors.exampleRequired && <span>Phone Number is required</span>}

            <input type="submit" />
          </form>
        </div>
        <div className="col-md-6" style={{display : shipmentData ? 'block' : 'none'}}>
          <ProcessPayment handlePayment={handlePaymentSuccess}></ProcessPayment>
        </div>
      </div>
    </div>
  );
};

export default Shipment;