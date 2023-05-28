import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('userId');

    axios.get(`https://api.noroff.dev/api/v1/holidaze/profiles/${userId}/bookings?_venue=true`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(response => {
        setBookings(response.data);
      })
      .catch(() => {
        setErrorMessage('Failed to load bookings. Please try again.');
      });
  }, []);

  const handleDelete = bookingId => {
    const accessToken = localStorage.getItem('accessToken');

    const confirmed = window.confirm('Are you sure you want to delete this booking?');
    if (confirmed) {
      
      axios
        .delete(`https://api.noroff.dev/api/v1/holidaze/bookings/${bookingId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(response => {
          
          setBookings(prevBookings => prevBookings.filter(booking => booking.id !== bookingId));
        })
        .catch(error => {
          console.error('Error deleting booking: ', error);
        });
    }
  };
  

  return (
    <div>
      <h1>Your Bookings</h1>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {bookings.map(booking => (
          <div className="col" key={booking.id}>
            <Card className="h-100">
              <Card.Img variant="top" src={booking.venue.media[0]} />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{booking.venue.name}</Card.Title>
                <Card.Text>
                  {booking.venue.description.slice(0, 250)}{booking.venue.description.length > 250 && '...'}
                </Card.Text>
                <Card.Text>Date from: {format(new Date(booking.dateFrom), 'dd/MM/yyyy')}</Card.Text>
                <Card.Text>Date to: {format(new Date(booking.dateTo), 'dd/MM/yyyy')}</Card.Text>
              </Card.Body>
              <Card.Footer className="mt-auto d-flex justify-content-between">
                <Link to={`/bookings/${booking.id}`}>
                  <Button variant="primary">View Booking</Button>
                </Link>
                <Button variant="danger" onClick={() => handleDelete(booking.id)}>Delete Booking</Button>
              </Card.Footer>
            </Card>
          </div>
        ))}
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    </div>
  );
}

export default Bookings;
