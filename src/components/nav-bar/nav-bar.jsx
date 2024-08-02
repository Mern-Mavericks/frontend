import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/auth-context';

const Navbar = () => {
  const { isAuthenticated, signout } = useAuth();

  return (

    <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
      <div className="container-fluid">
        <a className="navbar-brand d-flex justify-content-center align-items-center"  href="/">
          <img src="/MERN Mavericks.png" alt="Logo" width="30" height="30" className="d-inline-block align-text-top me-2" />
          MERN Mavericks
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse d-flex justify-content-end align-items-center" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/my-profile">MY PROFILE</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/sign-in">SIGN OUT</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/sign-up">SIGN UP</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/sign-in">SIGN IN</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
