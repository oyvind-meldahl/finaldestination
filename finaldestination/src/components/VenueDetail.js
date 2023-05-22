import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BookingForm from './BookingForm';
import DeleteVenue from './DeleteVenue';

function VenueDetail() {
  const [venue, setVenue] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`https://api.noroff.dev/api/v1/holidaze/venues/${id}`)
      .then(response => {
        setVenue(response.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      })
  }, [id]); // useEffect dependency array includes id to refetch when id changes

  // Display loading message while data is being fetched
  if (!venue) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {venue ? (
        <>
          <h1>{venue.name}</h1>
          <p>{venue.description}</p>
          {/* Render the BookingForm component and pass the venue's ID as a prop */}
          <BookingForm venueId={venue.id} />
        <DeleteVenue venueId={venue.id} />
        </>
      ) : (
        <p>Loading...</p>
      )}
     
    </div>
  );
}

export default VenueDetail;

// {user.role === 'venueManager' && <DeleteVenue venueId={venue.id} />}