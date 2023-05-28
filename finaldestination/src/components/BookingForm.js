import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

function BookingForm({ venueId, venueName }) {
  const [guests, setGuests] = useState(1);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const accessToken = localStorage.getItem('accessToken');

    axios.post('https://api.noroff.dev/api/v1/holidaze/bookings?_venue=true', {
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
        navigate("/thank-you", {
          state: {
            name: venueName,
            venueId,
            guests: Number(guests),
            dateFrom,
            dateTo
          }
        });
      })
      .catch(error => {
        setErrorMessage('Booking failed. Please try again.');
      });
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-md-center">
        <Col md="6">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Number of Guests</Form.Label>
              <Form.Control type="number" min="1" step="1" value={guests} onChange={e => setGuests(e.target.value)} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Date From</Form.Label>
              <Form.Control type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Date To</Form.Label>
              <Form.Control type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} required />
            </Form.Group>

            <Button variant="primary" type="submit">
              Book
            </Button>
          </Form>
          {errorMessage && <p>{errorMessage}</p>}
        </Col>
      </Row>
    </Container>
  );
}

export default BookingForm;
