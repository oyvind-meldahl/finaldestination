import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('https://api.noroff.dev/api/v1/holidaze/auth/login', {
      email,
      password,
    })
      .then(response => {
        // Login was successful, save the token in local storage
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('userId', response.data.name);

        // Here you would typically also set the user in your app's state
        alert('Login successful!');
      })
      .catch(error => {
        // Something went wrong, inform the user
        setErrorMessage('Login failed. Please check your email and password and try again.');
      });
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default Login;


/* 

function logout() {
  // Clear access token from local storage
  localStorage.removeItem('accessToken');

  // Clear user data from state
  setUser(null);

  // Redirect to login page
  navigate('/login');
}


*/

/*

import { useNavigate } from 'react-router-dom';

// ...

const navigate = useNavigate();

// ...


*/