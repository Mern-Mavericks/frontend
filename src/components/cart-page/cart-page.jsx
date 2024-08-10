import React from 'react';
import { useCart } from '../../context/cart-context';

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();

  const calculateTotal = () => {
    return cart.reduce((acc, product) => acc + product.price * product.quantity, 0).toFixed(2);
  };

  const handleCheckout = () => {
    // Implement checkout logic or redirect to checkout page
    alert('Proceeding to checkout...');
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Your Shopping Cart</h2>
      {cart.length === 0 ? (
        <div className="alert alert-warning text-center" role="alert">
          Your cart is currently empty.
        </div>
      ) : (
        <div>
          <ul className="list-group mb-4">
            {cart.map((product) => (
              <li
                key={product._id}
                className="list-group-item d-flex justify-content-between align-items-center p-2"
              >
                <div className="d-flex align-items-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: '80px', height: '80px', objectFit: 'cover', marginRight: '15px' }}
                  />
                  <div>
                    <h5 className="mb-1">{product.name}</h5>
                    <p className="mb-1 text-muted">Price: ${product.price.toFixed(2)}</p>
                    <p className="mb-0 text-muted">Total: ${(product.price * product.quantity).toFixed(2)}</p>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <input
                    type="number"
                    className="form-control me-3"
                    style={{ width: '80px' }}
                    value={product.quantity}
                    onChange={(e) =>
                      updateQuantity(product, parseInt(e.target.value, 10) || 1)
                    }
                    min="1"
                  />
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => removeFromCart(product)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="text-right mb-4">
            <h4>Total: ${calculateTotal()}</h4>
          </div>
          <div className="text-center">
            <button 
              className="btn btn-primary btn-lg"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
