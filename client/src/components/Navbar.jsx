import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">My Blog</div>
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-white hover:text-gray-300">Home</Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/create-post" className="text-white hover:text-gray-300">Create Post</Link>
              <div className="relative">
                <div className="flex items-center space-x-2 cursor-pointer" onClick={toggleDropdown}>
                  {user.profilePicture ? (
                    <div className="w-8 h-8 rounded-full border-2 border-orange-500 overflow-hidden">
                      <img src={user.profilePicture} alt={user.username} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full border-2 border-orange-500 flex items-center justify-center text-white bg-gray-400">
                      {user.username.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="text-white">{`Hi, ${user.username}`}</span> {/* Greeting added here */}
                </div>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-20" onBlur={closeDropdown}>
                    <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Profile</Link>
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200">Logout</button>
                  </div>
                )}
              </div>
              <div className="relative">
                <Link to="/notifications" className="text-white hover:text-gray-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                  </svg>
                </Link>
                <span className="absolute top-0 right-0 block h-2 w-2 bg-red-600 rounded-full ring-2 ring-white"></span>
              </div>
            </>
          ) : (
            <>
              <Link to="/signup" className="text-white hover:text-gray-300">Signup</Link>
              <Link to="/login" className="text-white hover:text-gray-300">Login</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
