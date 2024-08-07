import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/auth-context';
import { signout as apiSignout } from '../../api/auth-api';

const Navbar = () => {
  const { isAuthenticated, signout } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    const res = await apiSignout();
    if (!res.error) {
      signout();
      localStorage.removeItem('token');
      toast.success('Successfully signed out!');
      navigate('/sign-in');
    } else {
      toast.error('Sign out failed: ' + res.error);
    }
  };

  return (
    <nav
      className="navbar navbar-expand bg-dark border-bottom border-body"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <Link
          className="navbar-brand d-flex justify-content-center align-items-center"
          to="/"
        >
          <img
            src="/MERN Mavericks.png"
            alt="Logo"
            width="30"
            height="30"
            className="d-inline-block align-text-top me-2"
          />
          MERN Mavericks
        </Link>
        <div className="navbar-collapse d-flex justify-content-end align-items-center">
          <ul className="navbar-nav">
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/users">
                    USERS
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/my-profile">
                    MY PROFILE
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link btn btn-link"
                    onClick={handleSignOut}
                  >
                    SIGN OUT
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/sign-up">
                    SIGN UP
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/sign-in">
                    SIGN IN
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
