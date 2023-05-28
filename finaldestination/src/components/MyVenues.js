import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function MyVenues() {
  const [myVenues, setMyVenues] = useState([]);
  const accessToken = localStorage.getItem('accessToken');
  const venueManager = localStorage.getItem('venueManager') === 'true';
  const userId = localStorage.getItem('userId');

  useEffect(() => {
   
    if (venueManager) {
      axios
        .get(`https://api.noroff.dev/api/v1/holidaze/profiles/${userId}/venues`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(response => {
          setMyVenues(response.data);
        })
        .catch(error => {
          console.error('Error fetching data: ', error);
        });
    }
  }, [venueManager]);

  const handleDelete = venueId => {
    const confirmed = window.confirm('Are you sure you want to delete this venue?');
    if (confirmed) {
     
      axios
        .delete(`https://api.noroff.dev/api/v1/holidaze/venues/${venueId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(response => {
        
          setMyVenues(prevVenues => prevVenues.filter(venue => venue.id !== venueId));
        })
        .catch(error => {
          console.error('Error deleting venue: ', error);
        });
    }
  };
  

  return (
    <div>
      <h1 className="mb-4">My Venues</h1>

      {myVenues.length === 0 && (
        <p>You do not have any venues. Maybe you want to create one?</p>
      )}

      <div className="row row-cols-1 row-cols-md-2 g-5 mt-1">
        {myVenues.map(venue => (
          <div className="col" key={venue.id}>
            <Card className="h-100">
              <Card.Img variant="top" src={`${venue.media[0]}`} alt="Card image" />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{venue.name}</Card.Title>
                <Card.Text>
                  {venue.description.slice(0, 250)}
                  {venue.description.length > 250 && '...'}
                </Card.Text>
              </Card.Body>
              <Card.Footer className="mt-auto d-flex justify-content-between">
                <Link to={`/venues/${venue.id}`}>
                  <Button variant="primary">View Bookings</Button>
                </Link>
                <Button variant="danger" onClick={() => handleDelete(venue.id)}>
                  Delete Venue
                </Button>
                <Link to={`/edit-venue/${venue.id}`}>
  <Button variant="warning">Edit Venue</Button>
</Link>
              </Card.Footer>
            </Card>
          </div>
        ))}
      </div>

      <div className="mt-5">
        <p>
          <Link to="/create-venue" className="btn btn-primary btn-lg mt-3 w-100">
            New Venue
          </Link>
        </p>
        </div>
</div>
);
}

export default MyVenues;
