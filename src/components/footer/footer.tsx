import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="text-center" style={{ display: 'contents' }}>
      <span className="mb-1">
        {' '}
        &copy; 2024 MERN Mavericks Store. All rights reserved.
      </span>
      <span className="mb-3">
        {' '}
        <Link to="/terms" className="text-dark">
          Terms of Service
        </Link>{' '}
        |{' '}
        <Link to="/privacy" className="text-dark">
          Privacy Policy
        </Link>{' '}
      </span>
    </footer>
  );
};

export default Footer;
