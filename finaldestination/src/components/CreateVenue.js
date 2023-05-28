import React, { useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';


function CreateVenue() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [maxGuests, setMaxGuests] = useState('');
  const [price, setPrice] = useState('');
  const [media, setMedia] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useNavigate();
  const [wifi, setWifi] = useState(false);
  const [parking, setParking] = useState(false);
  const [breakfast, setBreakfast] = useState(false);
  const [pets, setPets] = useState(false);
  
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [country, setCountry] = useState('');
  const [venueCreated, setVenueCreated] = useState(false);
  const [newVenueId, setNewVenueId] = useState(null);
  

  function handleSubmit(e) {
    e.preventDefault();

    
    const accessToken = localStorage.getItem('accessToken');

    axios.post('https://api.noroff.dev/api/v1/holidaze/venues', {
      name,
      description,
      maxGuests: Number(maxGuests),
      price: Number(price),
      media: media ? [media] : [], 
      meta: {
        wifi,
        parking,
        breakfast,
        pets
      },
      location: {
        address,
        city,
        zip,
        country,
    
      }
    }, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(response => {
        console.log(response.data);
        setNewVenueId(response.data.id);
        setVenueCreated(true);
       
       
      })
      .catch(error => {
        if (error.response) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage('Failed to create venue. Please try again.');
        }
      });
  }

  if (venueCreated && newVenueId) {
    return <Navigate to={`/my-venues`} />
  }


  return (
    <form onSubmit={handleSubmit} className="container">
      <h1>Create Venue</h1>

      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input type="text" className="form-control" id="name" value={name} onChange={e => setName(e.target.value)} required />
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <textarea className="form-control" id="description" value={description} onChange={e => setDescription(e.target.value)} required />
      </div>

      <div className="mb-3">
        <label htmlFor="guests" className="form-label">Max Guests</label>
        <input type="number" className="form-control" id="guests" value={maxGuests} onChange={e => setMaxGuests(e.target.value)} required />
      </div>

      <div className="mb-3">
        <label htmlFor="price" className="form-label">Price</label>
        <input type="number" className="form-control" id="price" value={price} onChange={e => setPrice(e.target.value)} required />
      </div>

      <div className="mb-3">
        <label htmlFor="media" className="form-label">Media URL</label>
        <input type="url" className="form-control" id="media" value={media} onChange={e => setMedia(e.target.value)} placeholder="https://example.com" pattern="https://.*" size="30" required />
      </div>

     

      <div className="mb-3">
        <label htmlFor="address" className="form-label">Address</label>
        <input type="text" className="form-control" id="address" value={address} onChange={e => setAddress(e.target.value)} />
      </div>

      <div className="mb-3">
        <label htmlFor="city" className="form-label">City</label>
        <input type="text" className="form-control" id="city" value={city} onChange={e => setCity(e.target.value)} />
      </div>

      <div className="mb-3">
        <label htmlFor="zip" className="form-label">ZIP</label>
        <input type="text" className="form-control" id="zip" value={zip} onChange={e => setZip(e.target.value)} />
      </div>

      <div className="mb-3">
        <label htmlFor="country" className="form-label">Country</label>
        <input type="text" className="form-control" id="country" value={country} onChange={e => setCountry(e.target.value)} />
      </div>


      <div className="mb-3 form-check">
        <input type="checkbox" className="form-check-input" id="wifi" checked={wifi} onChange={e => setWifi(e.target.checked)} />
        <label className="form-check-label" htmlFor="wifi">WiFi</label>
      </div>

      <div className="mb-3 form-check">
        <input type="checkbox" className="form-check-input" id="parking" checked={parking} onChange={e => setParking(e.target.checked)} />
        <label className="form-check-label" htmlFor="parking">Parking</label>
      </div>

      <div className="mb-3 form-check">
        <input type="checkbox" className="form-check-input" id="breakfast" checked={breakfast} onChange={e => setBreakfast(e.target.checked)} />
        <label className="form-check-label" htmlFor="breakfast">Breakfast</label>
      </div>

      <div className="mb-3 form-check">
        <input type="checkbox" className="form-check-input" id="pets" checked={pets} onChange={e => setPets(e.target.checked)} />
        <label className="form-check-label" htmlFor="pets">Pets Allowed</label>
      </div>

      {errorMessage && <p className="text-danger">{errorMessage}</p>}
      <button type="submit" className="btn btn-primary">Create</button>
    </form>
  );
}

export default CreateVenue;

