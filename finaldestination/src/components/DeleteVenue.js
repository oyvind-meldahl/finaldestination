import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function DeleteVenue({ venueId, handleDelete }) {
    const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  function handleDelete() {
   
    const accessToken = localStorage.getItem('accessToken');
  
    axios
      .delete(`https://api.noroff.dev/api/v1/holidaze/venues/${venueId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
      
        console.log(error);
        setErrorMessage('Failed to delete venue.');
      })
      .finally(() => {
        navigate('/my-venues');
      });
  }

  return (
    <div>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default DeleteVenue;
