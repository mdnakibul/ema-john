import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';
import './header.css'
class header extends Component {
    render() {
        return (
            <div className='header'>
                <img src={logo} alt=""/>
                <nav>
                    <ul>
                        <li> <Link to={"/shop"}> Shop</Link></li>
                        <li> <Link to={"/review"}>Order Review</Link> </li>
                        <li> <Link to={"/inventory"}>Manage Inventory</Link></li>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default header;