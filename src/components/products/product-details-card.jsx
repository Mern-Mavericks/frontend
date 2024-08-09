import React, { useState } from 'react';
import './product-details-card.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth-context';
import { useCart } from '../../context/cart-context';

const ProductDetailsCard = ({ product, title, price, description, image }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { addProduct } = useCart();
  const [quantity, setQuantity] = useState(1);

  const validateShopper = () => {
    if (!isAuthenticated) {
      navigate('/sign-in');
    } else {
      if (product) {
        addProduct(product, quantity); // Pass product and quantity
        console.log('Product added to cart:', product);
      } else {
        console.error('Product is undefined or missing details');
      }
    }
  };

  return (
    <div className="product-details-container">
      <div className="product-image">
        <img src={image} alt={title} />
      </div>
      <div className="product-details">
        <h2 className="product-name">{title}</h2>
        <h4 className="product-price">${price}</h4>
        <div>
          <label htmlFor="quantity">Quantity:</label>
          <select
            id="quantity"
            className="product-quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))} // Keep track of user changing the quantity
          >
            {[...Array(10).keys()].map((i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          <button
            className="product-add-cart btn btn-primary"
            onClick={validateShopper}
          >
            Add to Cart
          </button>
        </div>
        <h4 className="product-description-title">Product Description</h4>
        <p className="product-description">{description}</p>
      </div>
    </div>
  );
};

export default ProductDetailsCard;
