import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyProfile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleImageChange = (e) => {
    setProfileImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!profileImage || !name || !address || !phoneNumber) {
      toast.error('Please fill out all fields.');
      return;
    }

    // Logic for form submission
    toast.success('Profile updated successfully!');
  };

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">My Profile</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="profileImage" className="form-label">
            Profile Image <span className="text-danger">*</span>
          </label>
          <input
            type="file"
            className="form-control"
            id="profileImage"
            onChange={handleImageChange}
            required
          />
          {profileImage && (
            <div className="d-flex justify-content-center my-3">
              <img
                src={profileImage}
                alt="Profile"
                className="img-thumbnail"
                style={{ width: '150px', height: '150px' }}
              />
            </div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="phoneNumber" className="form-label">
            Phone Number <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>

        <div className="d-flex justify-content-center mt-4">
          <button type="submit" className="btn btn-primary">
            Save Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default MyProfile;
