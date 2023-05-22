import React, { useState } from 'react';
import axios from 'axios';

function UpdateAvatar() {
  const [avatarUrl, setAvatarUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    // Get the access token from local storage
    const accessToken = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('userId'); // Retrieve the user ID from local storage

    axios.put(`https://api.noroff.dev/api/v1/holidaze/${userId}/media`, {
      avatar: avatarUrl,
    }, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Failed to update avatar. Please try again.');
      }
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Avatar URL" value={avatarUrl} onChange={e => setAvatarUrl(e.target.value)} />
      <button type="submit">Update Avatar</button>
      {errorMessage && <p>{errorMessage}</p>}
    </form>
  );
}

export default UpdateAvatar;
