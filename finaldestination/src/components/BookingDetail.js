import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Card, Row, Col } from 'react-bootstrap';
import placeholderImage from '../logo2.png';

function BookingDetail() {
  const [booking, setBooking] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('userId');

    axios.get(`https://api.noroff.dev/api/v1/holidaze/bookings/${id}?_venue=true`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(response => {
        setBooking(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, [id]);

  if (!booking) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Card className="mb-4">
        <Card.Body>
          <h1>{booking.venue.name}</h1>
          <p>{booking.venue.description}</p>
        </Card.Body>
      </Card>
      <img src={booking.venue.media[0] ? booking.venue.media[0] : placeholderImage} alt={booking.venue.name} className="detailsImage" />
      
      <Row className="row-eq-height"> 
        <Col md={6}>
          <Card className="h-100 mb-4"> 
            <Card.Body>
              <Card.Title>Booking</Card.Title>
              <p>Date from: {new Date(booking.dateFrom).toLocaleDateString()}</p>
              <p>Date to: {new Date(booking.dateTo).toLocaleDateString()}</p>
              <p>Guests: {booking.guests}</p>
              <Card.Title>Details</Card.Title>
              <p>Breakfast: {booking.venue.meta.breakfast ? 'Yes' : 'No'}</p>
              <p>Parking: {booking.venue.meta.parking ? 'Yes' : 'No'}</p>
              <p>Pets: {booking.venue.meta.pets ? 'Yes' : 'No'}</p>
              <p>Wifi: {booking.venue.meta.wifi ? 'Yes' : 'No'}</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="h-100 mb-4"> 
            <Card.Body>
              <Card.Title>Location</Card.Title>
              <p>Address: {booking.venue.location.address}</p>
              <p>City: {booking.venue.location.city}</p>
              <p>Zip: {booking.venue.location.zip}</p>
              <p>Country: {booking.venue.location.country}</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default BookingDetail;
