import React, { useContext, useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import { ThemeContext } from '../ThemeContext';
import SearchBar from './SearchBar';

const Navbar = ({ searchQuery, setSearchQuery }) => {
  const { isAuthenticated, logout, user } = useContext(AuthContext);
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [toggleChecked, setToggleChecked] = useState(darkMode);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeDropdown = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  const handleDarkModeToggle = () => {
    toggleDarkMode();
    setToggleChecked(!toggleChecked);
  };

  useEffect(() => {
    document.addEventListener('mousedown', closeDropdown);
    return () => {
      document.removeEventListener('mousedown', closeDropdown);
    };
  }, []);

  useEffect(() => {
    setToggleChecked(darkMode);
  }, [darkMode]);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="text-white text-lg font-bold">My Blog</div>
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-white hover:text-gray-300 hover:bg-gray-700 py-2 px-4 rounded transition duration-300">Home</Link>
            {isAuthenticated ? (
              <Link to="/create-post" className="text-white hover:text-gray-300 hover:bg-gray-700 py-2 px-4 rounded transition duration-300">Create Post</Link>
            ) : (
              <>
                <Link to="/signup" className="text-white hover:text-gray-300 hover:bg-gray-700 py-2 px-4 rounded transition duration-300">Signup</Link>
                <Link to="/login" className="text-white hover:text-gray-300 hover:bg-gray-700 py-2 px-4 rounded transition duration-300">Login</Link>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {isAuthenticated && (
            <>
              <div className="hidden md:flex relative items-center space-x-2 cursor-pointer" onClick={toggleDropdown} ref={dropdownRef}>
                {user.profilePicture ? (
                  <div className="w-8 h-8 rounded-full border-2 border-orange-500 overflow-hidden">
                    <img src={user.profilePicture} alt={user.username} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full border-2 border-orange-500 flex items-center justify-center text-white bg-gray-400">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="text-white">{`Hi, ${user.username}`}</span>
                <div className={`absolute top-10 right-0 mt-2 bg-white rounded-md shadow-lg py-2 z-20 ${dropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} style={{ transition: 'opacity 0.3s ease, visibility 0.3s' }}>
                  <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-700 hover:text-white transition duration-300">Profile</Link>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-700 hover:text-white transition duration-300">Logout</button>
                </div>
              </div>
              <div className="relative">
                <Link to="/notifications" className="text-white hover:text-gray-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                  </svg>
                </Link>
                <span className="absolute top-0 right-0 block h-2 w-2 bg-red-600 rounded-full ring-2 ring-white"></span>
              </div>
              <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="darkModeToggle"
                  className="hidden"
                  checked={toggleChecked}
                  onChange={handleDarkModeToggle}
                />
                <label
                  htmlFor="darkModeToggle"
                  className={`relative inline-block w-10 h-5 rounded-full cursor-pointer transition-colors ${darkMode ? 'bg-gray-600' : 'bg-gray-400'}`}
                >
                  <span className={`absolute left-1 top-1 w-3 h-3 rounded-full transition transform ${darkMode ? 'translate-x-5' : 'translate-x-0'} bg-white`} />
                  <span className="absolute right-1 top-1 w-3 h-3 rounded-full bg-yellow-500 transform transition-all duration-300" style={{ transform: darkMode ? 'translateX(0)' : 'translateX(-100%)' }}></span>
                  <span className="absolute left-1 top-1 w-3 h-3 rounded-full bg-gray-800 transform transition-all duration-300" style={{ transform: darkMode ? 'translateX(100%)' : 'translateX(0)' }}></span>
                </label>
              </div>
            </>
          )}
        </div>
        <div className="md:hidden flex items-center">
          <button className="text-white" onClick={toggleMenu}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block text-white hover:text-gray-300 hover:bg-gray-700 py-2 px-4 rounded transition duration-300">Home</Link>
            {isAuthenticated ? (
              <Link to="/create-post" className="block text-white hover:text-gray-300 hover:bg-gray-700 py-2 px-4 rounded transition duration-300">Create Post</Link>
            ) : (
              <>
                <Link to="/signup" className="block text-white hover:text-gray-300 hover:bg-gray-700 py-2 px-4 rounded transition duration-300">Signup</Link>
                <Link to="/login" className="block text-white hover:text-gray-300 hover:bg-gray-700 py-2 px-4 rounded transition duration-300">Login</Link>
              </>
            )}
            {isAuthenticated && (
              <>
                <Link to="/profile" className="block text-white hover:text-gray-300 hover:bg-gray-700 py-2 px-4 rounded transition duration-300">Profile</Link>
                <button onClick={handleLogout} className="block w-full text-left text-white hover:text-gray-300 hover:bg-gray-700 py-2 px-4 rounded transition duration-300">Logout</button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
