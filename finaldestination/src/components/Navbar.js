import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const toggle = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setUser(false);
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fw-bold fs-5">
      <div className="container">
        <div className="d-flex justify-content-between w-100">
          <Link className="navbar-brand" to="/">
            <img src="/logo2.png" alt="Logo" width="150" height="150" className="d-inline-block align-top"/>
            
          </Link>
          <button onClick={toggle} className="navbar-toggler" type="button" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`} id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/venues">Venues</Link>
            </li>
            {user && (
              <li className="nav-item">
                <Link className="nav-link" to="/bookings" style={{whiteSpace: "nowrap"}}>Bookings</Link>
              </li>
            )}
            {user && localStorage.getItem('venueManager') === 'true' && (
              <li className="nav-item">
                <Link className="nav-link" to="/my-venues" style={{whiteSpace: "nowrap"}}>My Venues</Link>
              </li>
            )}
            {user && (
              <li className="nav-item">
                <Link className="nav-link" to="/profile">Profile</Link>
              </li>
            )}
            {user ? (
              <li className="nav-item">
                <button className="nav-link" style={{background: 'none', border: 'none'}} onClick={handleLogout}>Logout</button>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
