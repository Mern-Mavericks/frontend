import React from 'react';
import './product-details-card.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth-context';

const ProductDetailsCard = ({ title, price, description, image }) => {
  const { isAuthenticated } = useAuth(); // Get authentication status from context
  const navigate = useNavigate();

  const validateShopper = () => {
    if (!isAuthenticated) {
      navigate('/sign-in');
    } else {
      // Logic to add the product to the cart
      console.log('Product added to cart');
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
          <select id="quantity" className="product-quantity">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
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
