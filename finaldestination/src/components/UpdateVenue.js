import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function UpdateVenue() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [maxGuests, setMaxGuests] = useState('');
  const [price, setPrice] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    axios.get(`https://api.noroff.dev/api/v1/holidaze/venues/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(response => {
        const venue = response.data;
        setName(venue.name);
        setDescription(venue.location);
        setMaxGuests(venue.capacity);
        setPrice(venue.price)
      })
      .catch(error => {
        if (error.response) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage('Failed to load venue. Please try again.');
        }
      });
  }, [id]);

  function handleSubmit(e) {
    e.preventDefault();

    const accessToken = localStorage.getItem('accessToken');

    axios.put(`https://api.noroff.dev/api/v1/holidaze/venues/${id}`, {
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
      })
      .catch(error => {
        if (error.response) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage('Failed to update venue. Please try again.');
        }
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Update Venue</h1>
      <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
      <input type="text" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required />
      <input type="number" placeholder="Max guests" value={maxGuests} onChange={e => setMaxGuests(e.target.value)} required />
      <input type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} required />
      {errorMessage && <p>{errorMessage}</p>}
      <button type="submit">Update</button>
    </form>
  );
}

export default UpdateVenue;
