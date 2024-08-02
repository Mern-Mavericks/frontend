import React, { useState } from 'react';
// import { signin } from "../../../../api/authApi";
import { useNavigate } from 'react-router-dom';
// import { useAuth } from "../../../../context/authContext";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return setMessage('All fields are required');
    }

    try {
      // API call to sign in the user with the provided credentials
      const res = await signin(formData);
      if (res.error) {
        setMessage(res.error);
      } else {
        setMessage('Successfully signed in!');
        localStorage.setItem('token', res.token);
        // login(); // Call the login function from auth context to update the state
        navigate('/');
      }
    } catch (err) {
      setMessage(err.message);
    }
  };

  const displayErrorMessage = () => {
    if (message) {
      return <p className="text-danger mt-3">{message}</p>;
    }
    return null;
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Sign In</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Sign In
                </button>
                {displayErrorMessage()}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
