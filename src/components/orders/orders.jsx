import React, { useState } from 'react';

const OrderPage = () => {
  // Dummy data for orders
  const [orders] = useState([
    {
      _id: '605c72ef5f1b2c4f4c18e3b8',
      orderNumber: 'a12345',
      userName: 'John Doe',
      phoneNumber: '123-456-7890',
      address: '123 Main St, Anytown, USA',
      quantity: 2,
      delivered: false,
      createdAt: '2023-10-01T12:34:56Z',
    },
    {
      _id: '605c72ef5f1b2c4f4c18e3b9',
      orderNumber: 'b67890',
      userName: 'Jane Smith',
      phoneNumber: '987-654-3210',
      address: '456 Elm St, Othertown, USA',
      quantity: 1,
      delivered: true,
      createdAt: '2023-09-20T15:22:33Z',
    },
    {
      _id: '605c72ef5f1b2c4f4c18e3ba',
      orderNumber: 'c11223',
      userName: 'Alice Johnson',
      phoneNumber: '555-123-4567',
      address: '789 Oak St, Sometown, USA',
      quantity: 3,
      delivered: false,
      createdAt: '2023-09-25T08:10:12Z',
    },
  ]);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-5" style={{ fontWeight: 'bold', color: '#333' }}>
        Order History
      </h2>
      {orders.length === 0 ? (
        <div className="alert alert-warning text-center">No orders found</div>
      ) : (
        <div className="row justify-content-center">
          {orders.map((order) => (
            <div key={order._id} className="col-md-4 mb-4">
              <div
                className="card p-3 text-center"
                style={{
                  border: 'none',
                  borderRadius: '15px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                }}
              >
                <div className="card-body">
                  <h5 className="card-title" style={{ fontWeight: 'bold', color: '#007bff' }}>
                    Order #{order.orderNumber}
                  </h5>
                  <p className="card-text" style={{ marginBottom: '10px', fontSize: '16px', color: '#555' }}>
                    <strong>Name:</strong> {order.userName}
                  </p>
                  <p className="card-text" style={{ marginBottom: '10px', fontSize: '16px', color: '#555' }}>
                    <strong>Phone:</strong> {order.phoneNumber}
                  </p>
                  <p className="card-text" style={{ marginBottom: '10px', fontSize: '16px', color: '#555' }}>
                    <strong>Address:</strong> {order.address}
                  </p>
                  <p className="card-text" style={{ marginBottom: '10px', fontSize: '16px', color: '#555' }}>
                    <strong>Quantity:</strong> {order.quantity}
                  </p>
                  <p className="card-text" style={{ marginBottom: '10px', fontSize: '16px', color: order.delivered ? '#28a745' : '#dc3545' }}>
                    <strong>Status:</strong> {order.delivered ? 'Delivered' : 'Not Delivered'}
                  </p>
                  <p className="card-text" style={{ fontSize: '14px', color: '#888' }}>
                    <small>
                      Ordered on {new Date(order.createdAt).toLocaleDateString()}
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
