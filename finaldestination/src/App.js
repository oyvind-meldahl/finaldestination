// Libraries
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Contexts
import { AuthContext } from './components/AuthContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Homepage from "./components/Homepage";
import Profile from "./components/Profile";
import VenueList from "./components/VenueList";
import Bookings from "./components/Bookings";
import VenueDetail from "./components/VenueDetail";
import Login from "./components/Login";
import Logout from './components/Logout';
import Register from "./components/Register";
import CreateVenue from "./components/CreateVenue";
import UpdateVenue from "./components/UpdateVenue";
import VenueBookings from "./components/VenueBookings";
import MyVenues from './components/MyVenues';
import ThankYou from './components/ThankYou';
import EditVenue from './components/EditVenue';
import BookingDetail from './components/BookingDetail';

// Styles
import './App.css';

function App() {
  const [user, setUser] = useState(localStorage.getItem('accessToken') ? true : false);

  useEffect(() => {
    setUser(localStorage.getItem('accessToken') ? true : false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}> 
      <Router>
        <div className="d-flex flex-column vh-100">
          <Navbar />
          <main className="container mt-4 mb-4 flex-grow-1">
            <Routes>
              <Route path="/venues/:id" element={<VenueDetail />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/venues" element={<VenueList />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/register" element={<Register />} />
              <Route path="/create-venue" element={<CreateVenue />} />
              <Route path="/update-venue/:id" element={<UpdateVenue />} />
              <Route path="/venues/:id/bookings" element={<VenueBookings />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/my-venues" element={<MyVenues />} />
              <Route path="/thank-you" element={<ThankYou />} />
              <Route path="/edit-venue/:id" element={<EditVenue />} />
              <Route path="/bookings/:id" element={<BookingDetail />} />
              <Route path="/" element={<Homepage />} />
            </Routes>
          </main>
          <Footer className="mt-auto" />
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
