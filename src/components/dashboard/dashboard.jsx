import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [products, setProducts] = useState([
    {
      _id: '12345abcde',
      name: 'Product Name 1',
      description: 'This is a short description of Product Name 1.',
      price: 29.99,
      image: 'https://via.placeholder.com/300',
      stock: 10,
    },
    {
      _id: '67890fghij',
      name: 'Product Name 2',
      description: 'This is a short description of Product Name 2.',
      price: 49.99,
      image: 'https://via.placeholder.com/300',
      stock: 5,
    },
    {
      _id: '11121klmno',
      name: 'Product Name 3',
      description: 'This is a short description of Product Name 3.',
      price: 19.99,
      image: 'https://via.placeholder.com/300',
      stock: 20,
    },
    {
      _id: '13141pqrst',
      name: 'Product Name 4',
      description: 'This is a short description of Product Name 4.',
      price: 99.99,
      image: 'https://via.placeholder.com/300',
      stock: 0,
    },
  ]);
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item._id === product._id);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    toast.success(`${product.name} added to cart`);
  };

  const updateQuantity = (product, quantity) => {
    if (quantity <= 0) {
      removeFromCart(product);
    } else {
      setCart(
        cart.map((item) =>
          item._id === product._id ? { ...item, quantity } : item,
        ),
      );
      toast.info(`${product.name} quantity updated to ${quantity}`);
    }
  };

  const removeFromCart = (product) => {
    setCart(cart.filter((item) => item._id !== product._id));
    toast.error(`${product.name} removed from cart`);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Dashboard</h2>
      <div className="row">
        {products.map((product) => {
          const isInCart = cart.some((item) => item._id === product._id);
          return (
            <div key={product._id} className="col-lg-4 col-md-6 mb-4">
              <div className="card h-100 text-center">
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                  <p className="card-text">${product.price.toFixed(2)}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <button
                      style={{ width: '30%' }}
                      className="btn btn-primary"
                      onClick={() => addToCart(product)}
                      disabled={product.stock <= 0}
                    >
                      {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                    {isInCart && (
                      <>
                        <input
                          type="number"
                          style={{ width: '15%' }}
                          className="form-control"
                          value={
                            cart.find((item) => item._id === product._id)
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
                      </>
                    )}
                  </div>
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
