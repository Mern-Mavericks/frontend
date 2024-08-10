import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/cart-context';
import axios from 'axios';

const Dashboard = () => {
  const { cart, addToCart, updateQuantity, removeFromCart } = useCart();
  const [products, setProducts] = useState([]);
  const [authToken, setAuthToken] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        setAuthToken(token);

        const response = await axios.get('/api/products', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProducts(response.data);
      } catch (error) {
        console.error('Failed to fetch products', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Dashboard</h2>
      <div className="row">
        {products.map((product) => {
          const isOutOfStock =
            product?.stock <= 0 || !product?.name || !product?.description;
          const isInCart = cart.some((item) => item._id === product?._id);

          return (
            <div key={product?._id} className="col-lg-4 col-md-6 mb-4">
              <div className="card h-100 text-center">
                <img
                  src={
                    product?.image
                      ? `src/${product.image}`
                      : 'https://via.placeholder.com/300'
                  }
                  className="card-img-top"
                  alt={product?.name || 'Product Image'}
                  style={{ height: '300px', width: '100%', objectFit: 'cover' }}
                />
                <div className="card-body" style={{ height: '250px' }}>
                  <h5 className="card-title">
                    {product?.name || 'Unnamed Product'}
                  </h5>
                  <p
                    className="card-text mb-2"
                    style={{
                      minHeight: '60px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {product?.description || 'No description available.'}
                  </p>
                  <p className="card-text">
                    ${product?.price?.toFixed(2) || 'N/A'}
                  </p>
                  <div className="d-flex justify-content-center align-items-center">
                    <button
                      style={{ width: '100%' }}
                      className={`btn ${isOutOfStock ? 'btn-secondary' : 'btn-primary'}`}
                      onClick={() => !isOutOfStock && addToCart(product)}
                      disabled={isOutOfStock}
                    >
                      {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
                    </button>
                  </div>
                  {isInCart && !isOutOfStock && (
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <input
                        style={{ width: '15%' }}
                        type="number"
                        className="form-control"
                        value={
                          cart.find((item) => item._id === product?._id)
                            ?.quantity || 1
                        }
                        min="1"
                        onChange={(e) =>
                          updateQuantity(
                            product,
                            parseInt(e.target.value, 10) || 1,
                          )
                        }
                      />
                      <button
                        style={{ width: '35%' }}
                        className="btn btn-danger"
                        onClick={() => removeFromCart(product)}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="my-5 text-center">
        <a href="/cart" className="btn btn-success">
          Go to Cart ({cart.length})
        </a>
      </div>
    </div>
  );
};

export default Dashboard;
