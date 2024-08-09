import React from 'react';
import './cart-page.css';
import { useCart } from '../../context/cart-context';
import product1 from '../../images/product1.jpg';
import product2 from '../../images/product2.jpg';
import product3 from '../../images/product3.jpg';
import product6 from '../../images/product6.jpg';
import product7 from '../../images/product7.jpg';
import product10 from '../../images/product10.jpg';

const images = {
  'images/product1.jpg': product1,
  'images/product2.jpg': product2,
  'images/product3.jpg': product3,
  'images/product6.jpg': product6,
  'images/product7.jpg': product7,
  'images/product10.jpg': product10,
};

const CartPage = () => {
  const { cart, removeProduct, updateQuantity } = useCart();

  const calculateSubtotal = () => {
    return cart.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    );
  };

  const calculateTax = () => {
    const taxRate = 0.13;
    return calculateSubtotal() * taxRate;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  return (
    <div className="cart-page-container">
      <h2 className="cart-title">Your Shopping Cart</h2>
      <div className="cart-layout">
        {cart.map((item, index) => (
          <div className="cart-row" key={index}>
            <div className="cart-product-details">
              <img
                src={images[item.product.image]}
                alt={item.product.title}
                className="cart-product-image"
              />
              <div className="cart-product-info">
                <span className="cart-product-title">{item.product.name}</span>
                <span className="cart-product-price">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </span>
              </div>
              <input
                type="number"
                className="cart-quantity-input"
                value={item.quantity}
                min="1"
                onChange={(e) =>
                  updateQuantity(item.product._id, Number(e.target.value))
                }
              />
              <button
                className="btn btn-primary cart-btn"
                onClick={() => removeProduct(item.product._id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <p>Subtotal: ${calculateSubtotal().toFixed(2)}</p>
        <p>Tax: ${calculateTax().toFixed(2)}</p>
        <p>Total: ${calculateTotal().toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CartPage;
