import React, { useState } from 'react';
import axios from 'axios';

function BookingForm({ venueId }) {
  const [guests, setGuests] = useState(1);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Get the access token from local storage
    const accessToken = localStorage.getItem('accessToken');

    axios.post('https://api.noroff.dev/api/v1/holidaze/bookings', {
      venueId,
      guests: Number(guests),
      dateFrom,
      dateTo,
    }, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(response => {
        alert('Booking successful!');
      })
      .catch(error => {
        setErrorMessage('Booking failed. Please try again.');
      });
  };

  return (
    <div>
      <h1>Book a Venue</h1>
      <form onSubmit={handleSubmit}>
      <input type="number" min="1" step="1" placeholder="Number of Guests" value={guests} onChange={e => setGuests(e.target.value)} required />

        <input type="date" placeholder="Date From" value={dateFrom} onChange={e => setDateFrom(e.target.value)} required />
        <input type="date" placeholder="Date To" value={dateTo} onChange={e => setDateTo(e.target.value)} required />
        <button type="submit">Book</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default BookingForm;
