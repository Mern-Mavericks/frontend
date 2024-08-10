import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const OrderPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/orders/current', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data);
      } catch (error) {
        toast.error(error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container mt-5">
      <h2
        className="text-center mb-5"
        style={{ fontWeight: 'bold', color: '#333' }}
      >
        Order History
      </h2>
      {orders.length === 0 ? (
        <div className="alert alert-warning text-center">No orders found</div>
      ) : (
        <div className="row justify-content-center">
          {orders.map((order) => (
            <div
              key={order._id}
              className="col-md-4 mb-4 d-flex align-items-stretch"
            >
              <div
                className="card p-3 text-center"
                style={{
                  border: 'none',
                  borderRadius: '15px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                }}
              >
                <div className="card-body">
                  <h5
                    className="card-title"
                    style={{ fontWeight: 'bold', color: '#007bff' }}
                  >
                    Order #{order.orderNumber}
                  </h5>
                  <p
                    className="card-text"
                    style={{ fontSize: '16px', color: '#555' }}
                  >
                    <strong>Name:</strong> {order.userName}
                  </p>
                  <p
                    className="card-text"
                    style={{ fontSize: '16px', color: '#555' }}
                  >
                    <strong>Phone:</strong> {order.phoneNumber}
                  </p>
                  <p
                    className="card-text"
                    style={{ fontSize: '16px', color: '#555' }}
                  >
                    <strong>Address:</strong> {order.address}
                  </p>
                  <p
                    className="card-text"
                    style={{ fontSize: '16px', color: '#555' }}
                  >
                    <strong>Quantity:</strong> {order.quantity}
                  </p>
                  <p
                    className="card-text"
                    style={{
                      fontSize: '16px',
                      color: order.delivered ? '#28a745' : '#dc3545',
                    }}
                  >
                    <strong>Status:</strong>{' '}
                    {order.delivered ? 'Delivered' : 'Not Delivered'}
                  </p>
                </div>
                <div>
                  <p
                    className="card-text"
                    style={{ fontSize: '14px', color: '#888' }}
                  >
                    <small>
                      Ordered on{' '}
                      {new Date(order.createdAt).toLocaleDateString()}
                    </small>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderPage;
