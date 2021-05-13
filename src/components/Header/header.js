import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContex } from '../../App';
import logo from '../../images/logo.png'
import './header.css';


const Header = () => {
    const [loggedInUser,setLoggedInUser] = useContext(UserContex);
    // console.log(loggedInUser);
    return (
        <div className='header'>
            <img src={logo} alt="Logo" />
            <nav>
                <ul>
                    <li> <Link to={"/shop"}> Shop</Link></li>
                    <li> <Link to={"/review"}>Order Review</Link> </li>
                    <li> <Link to={"/inventory"}>Manage Inventory</Link></li>
                    {loggedInUser.email ? <button onClick={()=>setLoggedInUser({})}>Sign Out</button> : <li> <Link to={"/login"}>Sign In</Link></li>}
                </ul>
            </nav>
        </div>
    );
};

export default Header;