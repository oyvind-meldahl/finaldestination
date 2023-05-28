import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import { Card, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 


function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { setUser, setUserId } = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('https://api.noroff.dev/api/v1/holidaze/auth/login', {
      email,
      password,
    })
      .then(response => {
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('userId', response.data.name);
        localStorage.setItem('userEmail', response.data.email);
        localStorage.setItem('userManager', response.data.venueManager);
        localStorage.setItem('userAvatar', response.data.avatar);
        setUser(true);
        navigate('/venues');
      })
      .catch(error => {
        setErrorMessage('Login failed. Please check your email and password and try again.');
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <Card style={{ width: '30rem' }}>
        <Card.Body>
          <Card.Title><h1>Login</h1></Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 mt-3 btn-lg">
              Login
            </Button>
          </Form>
          {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
        </Card.Body>
      </Card>
    </div>
  );
}

export default Login;
