import React from 'react';
import { Link } from 'react-router-dom';
import './nav-bar.css';
// import { useAuth } from "../../../../context/authContext";

const Navbar = () => {
  // const { isAuthenticated, signout } = useAuth();

  return (

<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">MERN Mavericks</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
      {/* {isAuthenticated ? ( */}
        <li class="nav-item">
          <a class="nav-link" href="my-profile">MY PROFILE</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="sign-in">SIGN OUT</a>
        </li>
         {/* ) : ( */}
        <li class="nav-item">
          <a class="nav-link" href="sign-up">SIGN UP</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="sign-in"> SIGN IN</a>
        </li>
          {/* )} */}
      </ul>
    </div>
  </div>
</nav>
  );
};

export default Navbar;
