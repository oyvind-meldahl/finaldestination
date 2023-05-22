import React from 'react';
import { useHistory } from 'react-router-dom';

function Logout() {
  const history = useHistory();

  function handleLogout() {
    localStorage.removeItem('accessToken');
    // Remove the user's information from the state as well
    // ...
    history.push('/'); // Redirect the user to the home page (or the login page, as you see fit)
  }

  return (
    <button onClick={handleLogout}>Logout</button>
  );
}

export default Logout;
