import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../footer/footer';

const HomePage = () => {
  return (
    <div>
      {/* Header */}
      <header className="bg-dark text-white text-center py-3">
        <h1>MERN Mavericks Store</h1>
        <p>Your one-stop shop for amazing products</p>
      </header>

      {/* Hero Section */}
      <section
        className="hero bg-light text-center py-5"
        style={{
          background: 'url(https://via.placeholder.com/1200x400) no-repeat center center',
          backgroundSize: 'cover',
          color: '#fff',
        }}
      >
        <div className="container">
          <h2>Welcome to MERN Mavericks Store</h2>
          <p>Discover the best products at unbeatable prices</p>
          <Link to="/sign-up" className="btn btn-primary mt-3">Sign Up Now</Link>
        </div>
      </section>

      {/* Product Listings */}
      <section className="products py-5">
        <div className="container">
          <h2 className="text-center mb-4">Featured Products</h2>
          <div className="row">
            <div className="col-4">
              <div className="card mb-4">
                <img src="https://via.placeholder.com/300" className="card-img-top" alt="Product 1" />
                <div className="card-body">
                  <h5 className="card-title">Product 1</h5>
                  <p className="card-text">$19.99</p>
                  <Link to="/product/1" className="btn btn-primary">View Details</Link>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="card mb-4">
                <img src="https://via.placeholder.com/300" className="card-img-top" alt="Product 2" />
                <div className="card-body">
                  <h5 className="card-title">Product 2</h5>
                  <p className="card-text">$29.99</p>
                  <Link to="/product/2" className="btn btn-primary">View Details</Link>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="card mb-4">
                <img src="https://via.placeholder.com/300" className="card-img-top" alt="Product 3" />
                <div className="card-body">
                  <h5 className="card-title">Product 3</h5>
                  <p className="card-text">$39.99</p>
                  <Link to="/product/3" className="btn btn-primary">View Details</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
