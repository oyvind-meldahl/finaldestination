import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import VenueList from "./components/VenueList";
import Bookings from "./components/Bookings";
import VenueDetail from "./components/VenueDetail";
import Login from "./components/Login";
import Register from "./components/Register";
// ... and so on for each component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/venues/:id" element={<VenueDetail />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/venues" element={<VenueList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Add more routes as needed */}
        <Route path="/" element={<>Home page component</>} />
      </Routes>
    </Router>
  );
}

export default App;
