import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('');
  const [venueManager, setVenueManager] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();


  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post('https://api.noroff.dev/api/v1/holidaze/auth/register', {
        name,
        email,
        password,
        avatar,
        venueManager,
      })
      .then((response) => {
      
        navigate('/login');
      })
      .catch((error) => {
       
        setErrorMessage('Registration failed. Please try again.');
      });
  };

  return (
    <div className="card">
      <div className="card-body">
        <h1 className="card-title">Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="form-control"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="avatar" className="form-label">
              Avatar (Optional)
            </label>
            <input
              type="text"
              id="avatar"
              className="form-control"
              placeholder="Avatar URL"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              id="venueManager"
              className="form-check-input"
              checked={venueManager}
              onChange={(e) => setVenueManager(e.target.checked)}
            />
            <label htmlFor="venueManager" className="form-check-label">
              Venue Manager
            </label>
          </div>
          <button type="submit" className="btn btn-primary btn-lg w-100">
            Register
          </button>
        </form>
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    </div>
  );
}

export default Register;
