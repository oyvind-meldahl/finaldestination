import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import placeholderImage from '../logo2.png'; 

function VenueList() {
  const [venues, setVenues] = useState([]);
  const [offset, setOffset] = useState(0);
  const loadingRef = useRef(null);
  const limit = 25; 

  const accessToken = localStorage.getItem('accessToken');

  const loadVenues = useCallback(() => {
    axios.get(`https://api.noroff.dev/api/v1/holidaze/venues?sort=created&sortOrder=desc&limit=${limit}&offset=${offset}`)
      .then(response => {
        setVenues(prevVenues => [...prevVenues, ...response.data]);
        setOffset(prevOffset => prevOffset + limit);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, [offset]);

  useEffect(() => {
    loadVenues();
  }, []); 

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadVenues();
        }
      },
      { rootMargin: '0px 0px 100px 0px' }
    );

    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    return () => {
      if (loadingRef.current) {
        observer.unobserve(loadingRef.current);
      }
    };
  }, [loadVenues]);

  return (
    <div>
      <h1>Venues</h1>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {venues.map((venue, index) => (
          <div className="col" key={venue.id} ref={index === venues.length - 1 ? loadingRef : null}>
            <Card className="h-100"> 
            <Card.Img variant="top" src={venue.media[0] ? venue.media[0] : placeholderImage} />
              <Card.Body className="d-flex flex-column"> 
                <Card.Title>{venue.name.slice(0, 75)}{venue.name.length > 75 && '...'}</Card.Title>
                <Card.Text>
                  {venue.description.slice(0, 250)}{venue.description.length > 250 && '...'}
                </Card.Text>
                <Card.Text><strong>Price:</strong> ${venue.price}</Card.Text>
              </Card.Body>
              {accessToken && (
              <Card.Footer className="mt-auto"> 
               
                  <Link to={`/venues/${venue.id}`}>
                    <Button variant="primary">View Venue</Button>
                  </Link>
             
              </Card.Footer>
                 )}
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VenueList;
