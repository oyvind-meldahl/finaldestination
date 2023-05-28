import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Card, Row, Col } from 'react-bootstrap';
import BookingForm from './BookingForm';
import placeholderImage from '../logo2.png';




function VenueDetail() {
  const [bookings, setBookings] = useState([]);
  const [venue, setVenue] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`https://api.noroff.dev/api/v1/holidaze/venues/${id}?_owner=true&_bookings=true`)
      .then(response => {
        setVenue(response.data);
        console.log(response.data)
        console.log(venue.owner.name)
        const venueBookings = venue.bookings.map(booking => ({
            startDate: new Date(booking.dateFrom),
            endDate: new Date(booking.dateTo)
          }));
          setBookings(venueBookings);
        })
      
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, [id]);

  if (!venue) {
    return <div>Loading...</div>;
  }

  const handleBookNowClick = () => {
    setShowBookingForm(true);
  };

  const isVenueManager = JSON.parse(localStorage.getItem('venueManager'));
  const currentUserId = localStorage.getItem('userId');
  const isCreator = venue.owner.name === currentUserId;
  console.log(isCreator)
  console.log(isVenueManager)

  return (
    <div>
      
      {isVenueManager && isCreator && venue.bookings && (
  <Card className="mb-4">
    <Card.Header><b>Bookings</b></Card.Header>
    <Card.Body>
      {venue.bookings.length > 0 ? (
        venue.bookings.map((booking, index) => (
          <p key={index}><b>Booking Id:</b> {booking.id}, <b>Date from:</b> {new Date(booking.dateFrom).toLocaleDateString()},<b> Date to:</b> {new Date(booking.dateTo).toLocaleDateString()}, <b>Guests:</b> {booking.guests}</p>
        ))
      ) : (
        <p>No bookings yet</p>
      )}
    </Card.Body>
  </Card>
)}


      <Card className="mb-4">
     
        <Card.Body>
          <h1>{venue.name}</h1>
          <p>{venue.description}</p>
        </Card.Body>
      </Card>
      <img src={venue.media[0] ? venue.media[0] : placeholderImage} alt={venue.name} className="detailsImage" />


      
      <Row className="row-eq-height"> 
        <Col md={6}>
          <Card className="h-100 mb-4"> 
            <Card.Body>
              <Card.Title>Details</Card.Title>
              <p>Price: {venue.price}</p>
              <p>Number of guests: {venue.maxGuests}</p>
              <p>Wi-Fi: {venue.meta.wifi ? 'Yes' : 'No'}</p>
              <p>Parking: {venue.meta.parking ? 'Yes' : 'No'}</p>
              <p>Breakfast: {venue.meta.breakfast ? 'Yes' : 'No'}</p>
              <p>Pets: {venue.meta.pets ? 'Yes' : 'No'}</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="h-100 mb-4"> 
            <Card.Body>
              <Card.Title>Location</Card.Title>
              <p>Address: {venue.location.address}</p>
              <p>City: {venue.location.city}</p>
              <p>Zip: {venue.location.zip}</p>
              <p>Country: {venue.location.country}</p>
            
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <button onClick={handleBookNowClick} className="btn btn-primary w-100 mb-3 mt-5">BOOK NOW!</button>
      {showBookingForm && <BookingForm venueId={venue.id} venueName={venue.name} />}
    </div>
  );
}

export default VenueDetail;
