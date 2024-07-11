import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null); // New state for profile photo
  const [showModal, setShowModal] = useState(false);  
  const [error, setError] = useState(null);  
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000';

      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);
      if (profilePhoto) {
        formData.append('profilePhoto', profilePhoto);
      }

      await axios.post(`${apiUrl}/auth/register`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setShowModal(true);
    } catch (error) {
      console.error('Signup failed', error);
      if (error.response && error.response.status === 400) {
        setError(error.response.data.message);  // Set error message from server
      } else {
        setError('Signup failed due to server error'); 
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/login'); 
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex items-center justify-center h-full">
        <div className="bg-white p-8 mt-10 rounded shadow-md w-96">
          <h2 className="text-2xl font-bold mb-6">Signup</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>} {/* Display error message */}
          <form onSubmit={handleSignup}>
            <div className="mb-4">
              <label className="block text-gray-700">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700">Profile Photo</label>
              <input
                type="file"
                onChange={(e) => setProfilePhoto(e.target.files[0])}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Signup
            </button>
          </form>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-md w-96">
            <h2 className="text-2xl font-bold mb-6">Signup Successful!</h2>
            <p className="mb-4">Your account has been created successfully.</p>
            <button
              onClick={handleCloseModal}
              className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
