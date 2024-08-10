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
    <div className="container mt-4">
      <h2 className="text-center mb-4">All Users</h2>
      <div className="row">
        {users.map((user) => (
          <div key={user._id} className="col-md-4 mb-4">
            <div className="card text-center">
              <div className="card-body">
                <h5 className="card-title">{user.username || 'N/A'}</h5>
                <p className="card-text">Email: {user.email}</p>
                {/* <p className="card-text">Roles: {user.roles.join(', ')}</p> */}
                <p className="card-text">
                  Created At: {new Date(user.created_at).toLocaleDateString()}
                </p>
                <p className="card-text">
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
