import React, { useState, useEffect } from 'react';
import { getUsers } from '../../api/auth-api';
import { toast } from 'react-toastify';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const result = await getUsers();
        if (result.error) {
          toast.error(result.error);
        } else {
          setUsers(result);
        }
      } catch (err) {
        toast.error('Failed to fetch users');
      }
    };
    fetchAllUsers();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-5" style={{ fontWeight: 'bold', color: '#333' }}>
        All Users
      </h2>
      <div className="row">
        {users.map((user) => (
          <div key={user._id} className="col-md-4 mb-4">
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
                  {user.username || 'N/A'}
                </h5>
                <p className="card-text" style={{ fontSize: '16px', color: '#555' }}>
                  Email: {user.email}
                </p>
                <p className="card-text" style={{ fontSize: '16px', color: '#555' }}>
                  Created At: {new Date(user.created_at).toLocaleDateString()}
                </p>
                <p className="card-text" style={{ fontSize: '16px', color: '#555' }}>
                  Last Updated: {new Date(user.updated).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
