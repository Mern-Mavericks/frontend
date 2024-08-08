import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white text-center py-3">
      <div className="container">
        <p>&copy; 2024 MERN Mavericks Store. All rights reserved.</p>
        <div>
          <Link to="/terms-of-service" className="text-white mx-2">
            Terms of Service
          </Link>
          <Link to="/privacy-policy" className="text-white mx-2">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
