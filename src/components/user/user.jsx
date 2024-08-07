import React, { useState, useEffect } from 'react';
// import { getAllUsers } from "../../../../api/authApi";
import { getUsers } from '../../api/auth-api';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const result = await getUsers();
        if (result.error) {
          setMessage(result.error);
        } else {
          setUsers(result);
        }
      } catch (err) {
        setMessage('Failed to fetch users');
      }
    };
    fetchAllUsers();
  }, []);

  const displayErrorMessage = () => {
    if (message) {
      return <p>{message}</p>;
    }
    return null;
  };

  return (
    <div>
      <h2>All Users</h2>
      {displayErrorMessage()}
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user.username || user.name}</li>
          //        {users.map((user) => (
          //          <li key={user._id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
