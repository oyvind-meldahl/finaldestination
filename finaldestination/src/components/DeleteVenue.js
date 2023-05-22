import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DeleteVenue({ venueId }) {
  const [errorMessage, setErrorMessage] = useState('');

  function handleDelete() {
    // Get the access token from local storage
    const accessToken = localStorage.getItem('accessToken');

    axios.delete(`https://api.noroff.dev/api/v1/holidaze/venues/${venueId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(response => {
        console.log(response.data);
        // After deleting the venue, you could redirect the user somewhere
        // like the homepage or the venue manager's dashboard
      })
      .catch(error => {
        if (error.response) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage('Failed to delete venue. Please try again.');
        }
      });
  }

  return (
    <div>
      {errorMessage && <p>{errorMessage}</p>}
      <button onClick={handleDelete}>Delete Venue</button>
    </div>
  );
}

export default DeleteVenue;
