import React from 'react';
import { useLocation } from 'react-router-dom';
import { Card, Container } from 'react-bootstrap';

function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  }
  

function ThankYou() {
  const location = useLocation();
  const bookingDetails = location.state;

 
  if (!bookingDetails) {
    window.location.href = "/";
  }

  return (
    <Container className="d-flex justify-content-center">
      <Card style={{ width: '75%', marginTop: '2rem' }}>
        <Card.Body>
          <Card.Title><h1>Your booking has been made successfully</h1></Card.Title>
          <Card.Subtitle className="my-3 text-muted"><h3>Booking Details</h3></Card.Subtitle>
          <Card.Text>
           
          <p>Venue name: {bookingDetails.name}</p>
<p>Number of Guests: {bookingDetails.guests}</p>
<p>Date From: {formatDate(bookingDetails.dateFrom)}</p>
<p>Date To: {formatDate(bookingDetails.dateTo)}</p>
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ThankYou;
