import React, { useState } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';

function Profile() {
  const [editing, setEditing] = useState(false);
  const [avatar, setAvatar] = useState(localStorage.getItem('userAvatar'));
  const [venueManager, setVenueManager] = useState(localStorage.getItem('venueManager') === 'true');
  
  const username = localStorage.getItem('userId');
  const email = localStorage.getItem('userEmail');

  const handleEdit = () => {
    setEditing(!editing);
  };

  const handleUpdate = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('userId');
    
  
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
  
  
    if (avatar !== localStorage.getItem('avatar')) {
      const avatarBody = {
        avatar: avatar,
      };
  
      await axios.put(`https://api.noroff.dev/api/v1/holidaze/profiles/${userId}/media`, avatarBody, config);
  
      localStorage.setItem('avatar', avatar);
      setAvatar(avatar); 
    }
  
   
    if (venueManager !== (localStorage.getItem('venueManager') === 'true')) {
      const venueManagerBody = {
        venueManager: venueManager,
      };
  
      await axios.put(`https://api.noroff.dev/api/v1/holidaze/profiles/${userId}`, venueManagerBody, config);
  
      localStorage.setItem('venueManager', venueManager.toString());
    }
  
    setEditing(false);
    window.location.reload();
  };
  

  return (
    <Card className="text-center">
      <Card.Header>Profile</Card.Header>
      <Card.Body>
        <Card.Title>{username}</Card.Title>
        <Card.Text>Email: {email}</Card.Text>
        <Card.Img variant="top" src={avatar} alt="Avatar" className='my-3' />
        {editing ? (
          <div>
            <div>
              <label>
                Avatar URL:
                <input type="text" value={avatar} onChange={(e) => setAvatar(e.target.value)} />
              </label>
            </div>
            <div>
              <label>
                Are you a Venue Manager:
                <input type="checkbox" checked={venueManager} onChange={(e) => setVenueManager(e.target.checked)} />
              </label>
            </div>
            <Button variant="primary" className='w-50' onClick={handleUpdate}>Update</Button>
          </div>
        ) : (
          <div>
            <Card.Text>Are you a venue manager? {venueManager ? 'Yes' : 'No'}</Card.Text>
            <Button variant="primary" className='w-50' onClick={handleEdit}>Edit</Button>
          </div>
        )}
      </Card.Body>
     
    </Card>
  );
}

export default Profile;