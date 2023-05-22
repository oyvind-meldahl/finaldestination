import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Get the access token from local storage
    const accessToken = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('userId'); // Retrieve the user ID from local storage


    axios.get(`https://api.noroff.dev/api/v1/holidaze/profiles/${userId}/bookings`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(response => {
        setBookings(response.data);
        
      })
      .catch(error => {
        setErrorMessage('Failed to load bookings. Please try again.');
      });
  }, []);

  return (
    <div>
      <h1>Your Bookings</h1>
      {bookings.map(booking => (
        <div key={booking.id}>
          <h2>{booking.id}</h2>
          <p>Guests: {booking.guests}</p>
          <p>Date from: {booking.dateFrom}</p>
          <p>Date to: {booking.dateTo}</p>
        </div>
      ))}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default Bookings;
