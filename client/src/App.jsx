import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Posts from './components/AllPosts';
import CreatePost from './components/Posts';

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path='/' element={<Posts />} />
      <Route path='/posts' element={<Posts />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route path='/create-post' element={<CreatePost />} />
      </Routes>
    </Router>
  )
}

export default App;
