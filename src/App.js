import React, { createContext, useState } from 'react';
import './App.css';
import Header from './components/Header/Header.js'
import Shop from './components/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import Notfound from './components/Notfound/Notfound';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Login from './components/Login/Login';
import Shipment from './components/Shipment/Shipment';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import ProcessPayment from './components/ProcessPayment/ProcessPayment';

export const UserContex = createContext()
function App() {

  const [loggedInUser,setLoggedInUser] = useState({});
  return (
    <UserContex.Provider value={[loggedInUser,setLoggedInUser]}>
      <Router>
        <h3>Email : {loggedInUser.email}</h3>
        <Header></Header>
        <Switch>
          <Route path="/shop">
            <Shop />
          </Route>
          <PrivateRoute path="/inventory">
            <Inventory />
          </PrivateRoute>
          <Route path="/review">
            <Review></Review>
          </Route>
          <Route path="/payment">
            <ProcessPayment/>
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
          <PrivateRoute path="/shipment">
            <Shipment></Shipment>
          </PrivateRoute>
          <Route exact path="/">
            <Shop />
          </Route>
          <Route path="/product/:productKey">
            <ProductDetails/>
          </Route>
          <Route path="*">
            <Notfound/>
          </Route>
        </Switch>
      </Router>
    </UserContex.Provider>
  );
}

export default App;
