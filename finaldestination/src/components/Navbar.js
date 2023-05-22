// Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container d-flex justify-content-between">
        <Link className="navbar-brand" to="/">
          <img src="/path-to-your-logo.png" alt="Logo" width="30" height="30" className="d-inline-block align-top"/>
          My Airbnb
        </Link>
        <div>
          <button onClick={toggle} className="navbar-toggler" type="button" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`} id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/venues">Venues</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/bookings">My Bookings</Link>
              </li>
              {/* Add more links as needed */}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
