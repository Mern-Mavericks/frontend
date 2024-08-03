import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../footer/footer';
import axios from 'axios';

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage

      try {
        const response = await axios.get('http://localhost:3000/api/products/featured', {
          headers: {
            Authorization: `Bearer ${token}`, // Set the Authorization header with the token
          }
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      }
    };

    fetchFeaturedProducts();
  }, []);
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
            {products.length > 0 ? (
              products.map(product => (
                <div className="col-md-4" key={product._id}>
                  <div className="card mb-4">
                    <img 
                      src={product.image || "https://via.placeholder.com/300"} 
                      className="card-img-top" 
                      alt={product.name} 
                    />
                    <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text">${product.price}</p>
                      <Link to={`/product/${product._id}`} className="btn btn-primary">View Details</Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center">
                <p>No featured products available.</p>
              </div>
            )}
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
