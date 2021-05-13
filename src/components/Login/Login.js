import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContex } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import './Login.css'

function Login() {
  // Google And Facebook Auth Provider
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const fbProvider = new firebase.auth.FacebookAuthProvider();

  // Initializing firebase 
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }

  const [newUser, setNewUser] = useState(false)
  const [user, setUser] = useState({
    isSignedIn: false,
    newUser: false,
    name: '',
    email: '',
    password: '',
    photo: '',
    error: '',
    success: false
  })


const [loggedInUser,setLoggedInUser] = useContext(UserContex)
let history = useHistory();
let location = useLocation();
let { from } = location.state || { from: { pathname: "/" } };


// Handle Google Sign in  
  const handleSignIn = () => {
    firebase.auth().signInWithPopup(googleProvider)
      .then(res => {
        const { displayName, photoURL, email } = res.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(signedInUser);
        setLoggedInUser(signedInUser);
        getAuthToken();
        console.log(from);
        history.push(from)
      })
      .catch(err => {
        console.log(err);
        console.log(err.message);
      })
  }

  // Get Id Token 

  const getAuthToken = ()=>{
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
      // Send token to your backend via HTTPS
      sessionStorage.setItem('token',idToken);
    }).catch(function(error) {
      // Handle error
    });
  }

  // Handle Facevook Sign in  
  const handleFbSignIn = () =>{
    firebase
  .auth()
  .signInWithPopup(fbProvider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    // var credential = result.credential;

    // The signed-in user info.
    var newUser = result.user;

    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    // var accessToken = credential.accessToken;
    console.log(newUser);
    // ...
    setUser(newUser);
    setLoggedInUser(newUser)
  })
  .catch((error) => {
    // Handle Errors here.
    console.log(error.message)
    alert(error.message)
    // ...
  });
  }


  const handleSignOut = () => {
    firebase.auth().signOut()
      .then(res => {
        const signedOutUser = {
          isSignedIn: false,
          name: '',
          phot: '',
          email: '',
          password: '',
          error: '',
        }
        setUser(signedOutUser);
        console.log(res);
      })
      .catch(err => {
        console.log(err.message);
      })
  }


  const handleBlur = (e) => {
    let isFieldValid = true;
    if (e.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === 'password') {
      const passLength = e.target.value.length > 8;
      const passHasNum = /\d{1}/.test(e.target.value);
      isFieldValid = passHasNum && passLength;
    }

    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
      //  console.log(user);
    }
    else{
      alert('One or more field is invalid')
    }
  }

  const handleSubmit = (e) => {
    // console.log(user.email, user.password);
    console.log('hit inside');
    if (newUser && user.email && user.password) {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then((userCredential) => {
          // Signed in 
          const newUser = userCredential.user;
          console.log(newUser);
          const newUserInfo = { ...user };
          newUserInfo.success = true;
          newUserInfo.error = '';
          setUser(newUserInfo);
          updateUserName(user.name);
          
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
          console.log(user)
        });
    }

    if (!newUser && user.email && user.password) {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then((userCredential) => {
          console.log('User Logged In Successfully');
          const newUserInfo = { ...user };
          newUserInfo.success = true;
          newUserInfo.error = '';
          setUser(newUserInfo);
          console.log('Sign in user info', userCredential.user)
          setLoggedInUser(newUserInfo)
          console.log('Loggedin User', loggedInUser);
          history.replace(from)
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }
    e.preventDefault()
  }

  const updateUserName = name => {
    var user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name,
    }).then(function () {
      // Update successful.
      console.log('User name updated successfully');
    }).catch(function (error) {
      // An error happened.
      console.log(error);
    });
  }
  return (
    <div style={{textAlign:'center'}}>
      
      {
        user.isSignedIn && <div>
          <p>Welcome {user.name}</p>
          <p>Your email : {user.email}</p>
          <img src={user.photo} alt="" width="150px" />
        </div>
      }

      <h1> Login to Your Account </h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="newuser">
          <input type="checkbox" name="newuser" id="newuser" onChange={() => setNewUser(!newUser)} /> New User Sign In
        </label> <br />
        {newUser && <input type="text" name="name" className="mb-2" placeholder="Enter Your Name" onBlur={handleBlur} required />}
        <br />
        <input type="email" name="email" className="mb-2" placeholder="Enter your email address" onBlur={handleBlur} required />
        <br />
        <input type="password" name="password" id="password" className="mb-2" placeholder="Enter yout password" onBlur={handleBlur} required />
        <br />
        <input type="submit" value="Submit" />
      </form>
      <p style={{ color: 'red' }}>{user.error}</p>
      {user.success && <p style={{ color: 'green' }}>User {newUser ? "Created" : 'Logged In'} Successfully</p>}
      <p className='or'>or</p>
      {
        user.isSignedIn ? <button onClick={handleSignOut} className="btn btn-outline-primary">Sign out </button> :
          <button className="btn btn-lg btn-outline-primary mb-2" onClick={handleSignIn}> <FontAwesomeIcon icon={faGoogle}/> Signin With Google </button>
      }
      <br/>
      <button onClick={handleFbSignIn} className="btn btn-outline-primary"> <FontAwesomeIcon icon={faFacebook}/> Sign in with facebook</button>
    </div>
  );
}

export default Login;
