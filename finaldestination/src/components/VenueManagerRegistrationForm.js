import React, { useState } from 'react';
import axios from 'axios';

function VenueManagerRegistrationForm() {
   const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    axios.post('https://api.noroff.dev/api/v1/holidaze/auth/register', {
        name,
      email,
      password,
      venueManager: true, // Assuming your API uses the 'role' field for this
    })
      .then(response => {
        // Log the response to the console for now
        console.log(response.data);
        // You might want to do something like redirecting the user to the login page here
      })
      .catch(error => {
        // If there's an error, set the error message
        if (error.response) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage('Failed to register. Please try again.');
        }
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Register as Venue Manager</h1>
      <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
      {errorMessage && <p>{errorMessage}</p>}
      <button type="submit">Register</button>
    </form>
  );
}

export default VenueManagerRegistrationForm;
