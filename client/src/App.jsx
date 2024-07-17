import './App.css';
import React, { useState, useContext, useEffect } from 'react';
import { ThemeContext } from './ThemeContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuthenticationStatus } from './useAuthStatus';
import AuthProvider from './AuthContext';
import Signup from './components/Signup';
import Login from './components/Login';
import Posts from './components/AllPosts';
import PostDetail from './components/PostDetail';
import CreatePost from './components/Posts';
import EditPost from './components/EditPost';
import Navbar from './components/Navbar';

const App = () => {
  const { isAuthenticated } = useAuthenticationStatus();
  const [searchQuery, setSearchQuery] = useState('');
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);


  return (
    <AuthProvider>
      <Router>
        <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <Routes>
          <Route path='/' element={<Posts searchQuery={searchQuery} />} />
          <Route path='/posts' element={<Posts searchQuery={searchQuery} />} />
          <Route path="/posts/:postId" element={<PostDetail />} />
          <Route path="/edit/:postId" element={<EditPost />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          {/* Conditionally render CreatePost based on authentication */}
          {!isAuthenticated && <Route path="/create-post" element={<CreatePost />} />}
        </Routes>
    </Router>
    </AuthProvider>
  )
}

export default App;
