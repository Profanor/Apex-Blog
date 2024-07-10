import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">My Blog</div>
        <div className="space-x-4">
          <Link to="/" className="text-white hover:text-gray-300">Home</Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/create-post" className="text-white hover:text-gray-300">Create Post</Link>
              <button onClick={handleLogout} className="text-white hover:text-gray-300">Logout</button>
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
