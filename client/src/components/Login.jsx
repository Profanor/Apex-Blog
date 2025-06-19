/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { Eye, EyeOff, User, Lock } from 'lucide-react';
import axios from 'axios';
import Spinner from './Spinner';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please fill in both fields');
      return;
    }
    setLoading(true);

    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000';
      const response = await axios.post(`${apiUrl}/auth/login`, { username, password });

      if (response.data.message === 'User not found. Please sign up first.') {
        setError('User not found. Please sign up before logging in.');
      } else {
        login(response.data.token);
        navigate('/posts');
      }
    } catch (error) {
      console.error('Login failed', error);
      if (error.response && error.response.status === 400) {
        setError(error.response.data.message);
      } else {
        setError('Login failed due to server error');
      }
    }
    setLoading(false);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-white">
      <div className="bg-white shadow-xl p-8 rounded-3xl w-full max-w-md border border-blue-200">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-800">Welcome Back</h2>
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-gray-700 mb-1 flex items-center gap-2">
              <User size={16} /> Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-gray-300 text-black rounded-lg focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="text-gray-700 mb-1 flex items-center gap-2">
              <Lock size={16} /> Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 text-black rounded-lg pr-10 focus:outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? <Spinner /> : 'Login'}
          </button>
        </form>
        <p className="text-sm text-gray-700 text-center mt-4">
          Don't have an account?{' '}
          <a
            href="/signup"
            className="text-blue-600 hover:underline hover:text-blue-800 font-medium transition-colors duration-200"
          >
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
