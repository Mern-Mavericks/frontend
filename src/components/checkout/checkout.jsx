import React, { useState } from 'react';
import { useCart } from '../../context/cart-context';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CheckoutPage = () => {
  const { cart, setCart } = useCart();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState({
    name: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails({ ...orderDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fullAddress = `${orderDetails.address}, ${orderDetails.city}, ${orderDetails.state} ${orderDetails.zip}`;

    const orderPayload = cart.map((item) => ({
      productId: item._id,
      quantity: item.quantity,
      address: fullAddress,
      userName: orderDetails.name,
      phoneNumber: orderDetails.phoneNumber,
    }));

    try {
      await Promise.all(
        orderPayload.map(async (order) => {
          await axios.post('/api/orders/create', order, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
        }),
      );

      setCart([]);
      toast.success('Order placed successfully!');
      navigate('/orders');
    } catch (error) {
      toast.error('Failed to place order. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-5">Checkout</h2>
      <div className="row">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <h4 className="mb-4">Billing Information</h4>
            <div className="form-group mb-4">
              <label className="form-label" htmlFor="name">
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={orderDetails.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group mb-4">
              <label className="form-label" htmlFor="phoneNumber">
                Phone Number
              </label>
              <input
                type="text"
                className="form-control"
                id="phoneNumber"
                name="phoneNumber"
                value={orderDetails.phoneNumber}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group mb-4">
              <label className="form-label" htmlFor="address">
                Address
              </label>
              <textarea
                className="form-control"
                id="address"
                name="address"
                rows="3"
                value={orderDetails.address}
                onChange={handleInputChange}
                required
              />
            </div>
            <div
              className="form-row mb-4 d-flex"
              style={{ justifyContent: 'space-between' }}
            >
              <div className="form-group col-md-4 ms-1">
                <label className="form-label" htmlFor="city">
                  City
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  name="city"
                  value={orderDetails.city}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group col-md-4 ms-1">
                <label className="form-label" htmlFor="state">
                  State
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="state"
                  name="state"
                  value={orderDetails.state}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group col-md-4 ms-1">
                <label className="form-label" htmlFor="zip">
                  Zip
                </label>
                <input
                  type="text"
                  className="form-control"
                  style={{ width: '95%' }}
                  id="zip"
                  name="zip"
                  value={orderDetails.zip}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <h4 className="mb-4">Payment Information</h4>
            <div
              className="form-row mb-4 d-flex"
              style={{ justifyContent: 'space-between' }}
            >
              <div className="form-group col-md-4 ms-1">
                <label className="form-label" htmlFor="cardNumber">
                  Card Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="cardNumber"
                  name="cardNumber"
                  value={orderDetails.cardNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group col-md-4 ms-1">
                <label className="form-label" htmlFor="expiryDate">
                  Expiry Date
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="expiryDate"
                  name="expiryDate"
                  value={orderDetails.expiryDate}
                  onChange={handleInputChange}
                  placeholder="MM/YY"
                  required
                />
              </div>
              <div className="form-group col-md-4 ms-1">
                <label className="form-label" htmlFor="cvv">
                  CVV
                </label>
                <input
                  type="text"
                  style={{ width: '95%' }}
                  className="form-control"
                  id="cvv"
                  name="cvv"
                  value={orderDetails.cvv}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-success btn-lg">
                Place Order
              </button>
            </div>
          </form>
        </div>

        <div className="col-md-6">
          <h4 className="mb-4">Order Summary</h4>
          <ul className="list-group mb-4">
            {cart.map((product) => (
              <li
                key={product._id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div className="d-flex align-items-center">
                  <img
                    src={
                      product?.image
                        ? `src/${product.image}`
                        : 'https://via.placeholder.com/300'
                    }
                    alt={product.name}
                    style={{
                      width: '80px',
                      height: '80px',
                      objectFit: 'cover',
                      marginRight: '15px',
                    }}
                  />
                  <div>
                    <h5 className="mb-1">{product.name}</h5>
                    <p className="mb-0 text-muted">
                      Quantity: {product.quantity}
                    </p>
                  </div>
                </div>
                <p className="mb-0">
                  ${(product.price * product.quantity).toFixed(2)}
                </p>
              </li>
            ))}
          </ul>
          <div className="text-right">
            <h4>
              Total: $
              {cart
                .reduce(
                  (acc, product) => acc + product.price * product.quantity,
                  0,
                )
                .toFixed(2)}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
