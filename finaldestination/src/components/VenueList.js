import React, { useState, useEffect } from 'react';
import axios from 'axios';

function VenueList() {
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    axios.get('https://api.noroff.dev/api/v1/holidaze/venues')
      .then(response => {
        setVenues(response.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      })
  }, []);

  return (
    <div>
      <h1>Venues</h1>
      {venues.map(venue => (
        <div key={venue.id}>
          <h2>{venue.name}</h2>
          <h3>{venue.id}</h3>
          <p>{venue.description}</p>
        </div>
      ))}
    </div>
  );
}

export default VenueList;
