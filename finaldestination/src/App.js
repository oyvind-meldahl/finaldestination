import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import VenueList from "./components/VenueList";
import Bookings from "./components/Bookings";
import VenueDetail from "./components/VenueDetail";
import Login from "./components/Login";
import Register from "./components/Register";
import VenueManagerRegistrationForm from "./components/VenueManagerRegistrationForm";
import CreateVenue from "./components/CreateVenue";
import UpdateVenue from "./components/UpdateVenue";
import VenueBookings from "./components/VenueBookings";
import UpdateAvatar from "./components/UpdateAvatar";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css';
// ... and so on for each component

function App() {
  return (
    <Router>
      <div className="d-flex flex-column vh-100">
      <Navbar />
      <main className="container mt-4 mb-4 flex-grow-1">
      <Routes>
        <Route path="/venues/:id" element={<VenueDetail />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/venues" element={<VenueList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register-venue-manager" element={<VenueManagerRegistrationForm />} />
        <Route path="/create-venue" element={<CreateVenue />} />
        <Route path="/update-venue/:id" element={<UpdateVenue />} />
        <Route path="/venues/:id/bookings" element={<VenueBookings />} />
        <Route path="/update-avatar" element={<UpdateAvatar />} />

        {/* Add more routes as needed */}
        <Route path="/" element={<>Home page component</>} />
      </Routes>
      </main>
      <Footer className="mt-auto" />
      </div>
    </Router>
  );
}

export default App;
