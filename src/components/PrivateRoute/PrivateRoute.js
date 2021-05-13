import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router';
import { UserContex } from '../../App';

const PrivateRoute = ({children, ...rest}) => {
    const [loggedInUser] = useContext(UserContex)
    return (
        <Route
        {...rest}
        render = {({ location }) => 
    (loggedInUser.email || sessionStorage.getItem('token')) ? (children): (
        <Redirect to={{
            pathname : '/login',
            state : {from : location}
        }}/>
    )}
        />
    );
};

export default PrivateRoute;