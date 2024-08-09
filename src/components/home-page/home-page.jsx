import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../footer/footer';
import axios from 'axios';
import './home-page.css';

import product1 from '../../images/product1.jpg';
import product2 from '../../images/product2.jpg';
import product3 from '../../images/product3.jpg';
import product6 from '../../images/product6.jpg';
import product7 from '../../images/product7.jpg';
import product10 from '../../images/product10.jpg';

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage

      try {
        const response = await axios.get(
          'http://localhost:3000/api/products/featured',
          {
            headers: {
              Authorization: `Bearer ${token}`, // Set the Authorization header with the token
            },
          },
        );
        console.log(response.data); // Log the fetched products
        setProducts(response.data);
        console.log(`Number of products fetched: ${response.data.length}`); // Log the number of products
      } catch (error) {
        console.error('Error fetching featured products:', error);
      }
    };

    fetchFeaturedProducts();
  }, []);

  // Array of product images
  const productImages = [
    product1,
    product2,
    product3,
    product6,
    product7,
    product10,
    product10,
  ];

  console.log(`10: ${productImages.length}`);

  return (
    <div>
      {/* Header */}
      <header className="bg-dark text-white text-center py-3">
        <h1>MERN Mavericks Store</h1>
        <p>Your one-stop shop for amazing products</p>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h2>Welcome to MERN Mavericks Store</h2>
          <p>Discover the best products at unbeatable prices</p>
          <Link to="/sign-up" className="btn btn-primary mt-3">
            Sign Up Now
          </Link>
        </div>
      </section>

      {/* Product Listings */}
      <section className="products py-5">
        <div className="container">
          <h2 className="text-center mb-4">Featured Products</h2>
          <div className="row">
            {products.length > 0 &&
              products.map((product, index) => (
                <div className="col-md-4" key={product._id}>
                  <div className="card mb-4">
                    <img
                      src={
                        productImages[index] ||
                        'https://via.placeholder.com/300'
                      }
                      className="card-img-top"
                      alt={product.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text">${product.price}</p>
                      <Link
                        to={`/product/${product._id}`}
                        className="btn btn-primary"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
