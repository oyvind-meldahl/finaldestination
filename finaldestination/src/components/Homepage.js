import React from 'react';

function FrontPage() {
  return (
    <div className="container">
      <div className="row align-items-center">
        <div className="col-lg-6">
          <div className="d-flex align-items-center h-100">
            <img
              src="https://images.unsplash.com/photo-1590725175785-de025cc60835?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80"
              alt="Welcome to Airbnb"
              className="img-fluid rounded-5 frontimage"
            />
          </div>
        </div>
        <div className="col-lg-6 d-flex align-items-center">
          <div className="text-center">
            <h1>Welcome to Hummingbird!</h1>
            <p>
              Experience unique stays and adventures around the world.
              <br />
              Discover new places to rent and book your perfect accommodation.
            </p>
            <a href="/venues" className="btn btn-primary btn-lg">
              Start Exploring
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FrontPage;
