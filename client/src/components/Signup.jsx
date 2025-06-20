/* eslint-disable no-unused-vars */
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';
import { User, Lock, Image, Eye, EyeOff } from 'lucide-react';
import Spinner from './Spinner';
import axios from 'axios';

const animeImages = [
  '/images/gon2.jpg',
  '/images/luffy.jpg',
  '/images/naruto1.jpg'
];

const Signup = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [previewPhoto, setPreviewPhoto] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { darkMode } = useContext(ThemeContext);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % animeImages.length);
        setFade(true);
      }, 500); // delay for fade-out before switching
    }, 5000); // 5 seconds per slide

    return () => clearInterval(interval);
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000';

      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);
      if (profilePhoto) {
        formData.append('profilePhoto', profilePhoto);
      }

      const res = await axios.post(`${apiUrl}/auth/register`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      login(res.data.token);

      setShowModal(true);
      setLoading(false);
    } catch (error) {
      console.error('Signup failed', error);
      setLoading(false);
      if (error.response && error.response.status === 400) {
        setError(error.response.data.message);
      } else {
        setError('Signup failed due to server error');
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/');
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    setProfilePhoto(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewPhoto(null);
    }
  };

  return (
    <div className="h-screen flex overflow-hidden">
      {/* left panel with slideshow */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          key={currentIndex}
          src={animeImages[currentIndex]}
          alt="Anime Hero"
          className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-700 ${fade ? 'opacity-100' : 'opacity-0'}`}
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute bottom-8 left-8 text-white z-10">
          <h1 className="text-4xl font-bold mb-2 drop-shadow-md bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
            Join the Adventure
          </h1>
          <p className="text-lg text-white/90">Create your account and explore the anime multiverse.</p>
        </div>
      </div>

      {/* right panel with signup form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-8">
        <div className="bg-white shadow-xl p-8 rounded-3xl w-full max-w-md border border-blue-200">
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-800">Create Account</h2>
          {error && <p className="text-red-600 text-center mb-4">{error}</p>}
          <form onSubmit={handleSignup} className="space-y-4">
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
            <div>
              <label className="text-gray-700 mb-1 flex items-center gap-2">
                <Image size={16} /> Profile Photo
              </label>
              <input
                type="file"
                onChange={handlePhotoChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
              {previewPhoto && (
                <img
                  src={previewPhoto}
                  alt="Preview"
                  className="mt-2 rounded-lg w-24 h-24 object-cover border"
                />
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
              disabled={loading}
            >
              {loading ? <Spinner /> : 'Signup'}
            </button>
          </form>
            <p className="text-sm text-gray-700 text-center mt-4">
              Already have an account?{' '}
              <a
                href="/login"
                className="text-blue-600 hover:underline hover:text-blue-800 font-medium transition-colors duration-200 "
              >
                Log in here
              </a>
            </p>
        </div>
      </div>

      {/* success modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-4 text-green-700">Signup Successful!</h2>
            <p className="mb-4 text-gray-600">Your account has been created successfully.</p>
            <button
              onClick={handleCloseModal}
              className="w-full bg-green-500 text-white p-2 rounded-lg hover:bg-green-600"
              disabled={loading}
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
