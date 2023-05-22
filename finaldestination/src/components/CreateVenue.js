import React, { useState } from 'react';
import axios from 'axios';

function CreateVenue() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [maxGuests, setMaxGuests] = useState('');
  const [price, setPrice] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    // Get the access token from local storage
    const accessToken = localStorage.getItem('accessToken');

    axios.post('https://api.noroff.dev/api/v1/holidaze/venues', {
      name,
      description,
      maxGuests: Number(maxGuests),
      price: Number(price) ,
    }, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(response => {
        console.log(response.data);
        // You might want to do something like redirecting the user to the venue page here
      })
      .catch(error => {
        if (error.response) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage('Failed to create venue. Please try again.');
        }
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create Venue</h1>
      <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
      <input type="text" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required />
      <input type="number" placeholder="Max guests" value={maxGuests} onChange={e => setMaxGuests(e.target.value)} required />
      <input type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} required />
      {errorMessage && <p>{errorMessage}</p>}
      <button type="submit">Create</button>
    </form>
  );
}

export default CreateVenue;
