import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">My Blog</div>
        <div className="space-x-4">
          <Link to="/signup" className="text-white hover:text-gray-300">Signup</Link>
          <Link to="/login" className="text-white hover:text-gray-300">Login</Link>
          <Link to="/create-post" className="text-white hover:text-gray-300">Create Post</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
