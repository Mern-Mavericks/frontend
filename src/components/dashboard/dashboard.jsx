import React from 'react';

const Dashboard = () => {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col">
          <h1>Welcome to MERN Mavericks Dashboard</h1>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col">
          <div id="products">
            <h3>Products</h3>
            <p>Manage your products here.</p>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col">
          <div id="users">
            <h3>Users</h3>
            <p>Manage users of your store.</p>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col">
          <div id="signin">
            <h3>Sign In</h3>
            <p>User sign-in section.</p>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col">
          <div id="signup">
            <h3>Sign Up</h3>
            <p>User registration section.</p>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col">
          <div id="profile">
            <h3>My Profile</h3>
            <p>Manage your profile here.</p>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Dashboard;
