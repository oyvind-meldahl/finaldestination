import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function VenueBookings() {
  const [bookings, setBookings] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const { id } = useParams();

  useEffect(() => {
   
    const accessToken = localStorage.getItem('accessToken');

    axios.get(`https://api.noroff.dev/api/v1/holidaze/venues/${id}?_bookings=true`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(response => {
        setBookings(response.data.bookings);
        console.log(response.data)
      })
      .catch(error => {
        if (error.response) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage('Failed to load bookings. Please try again.');
        }
      });
  }, [id]);

  return (
    <div>
      <h1>Venue Bookings</h1>
      {errorMessage && <p>{errorMessage}</p>}
      <ul>
        {bookings.map(booking => (
          <li key={booking.id}>
            {booking.dateFrom} to {booking.dateTo} - {booking.guests} guests
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VenueBookings;
