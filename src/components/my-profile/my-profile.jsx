import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const MyProfile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  // Fetch user details on component mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('/api/users/me', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming you store the token in localStorage
          },
        });

        if (response.ok) {
          const data = await response.json();
          setName(data.name || '');
          setAddress(data.address || '');
          setPhoneNumber(data.phone || '');
          if (data.profileImage) {
            setProfileImage(`/uploads/${data.profileImage}`);
          }
        } else {
          const errorData = await response.json();
          toast.error(`Error: ${errorData.error}`);
        }
      } catch (error) {
        toast.error('An error occurred while fetching the profile data.');
        console.error('Error:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleImageChange = (e) => {
    setProfileImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !address || !phoneNumber) {
      toast.error('Please fill out all fields.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('address', address);
    formData.append('phone', phoneNumber);

    if (e.target.profileImage.files[0]) {
      formData.append('profileImage', e.target.profileImage.files[0]);
    }

    try {
      const response = await fetch('/api/users/me', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
      });

      if (response.ok) {
        toast.success('Profile updated successfully!');
      } else {
        const errorData = await response.json();
        toast.error(`Error: ${errorData.error}`);
      }
    } catch (error) {
      toast.error('An error occurred while updating the profile.');
      console.error('Error:', error);
    }
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
