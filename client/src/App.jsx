import './App.css';
import React from 'react';
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

  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Posts />} />
          <Route path='/posts' element={<Posts />} />
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
