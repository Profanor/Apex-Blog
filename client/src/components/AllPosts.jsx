import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/posts', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setPosts(response.data.posts);
      } catch (error) {
        console.error('Failed to fetch posts', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
        {posts.map((post) => (
          <div key={post._id} className="mb-4 p-4 border border-gray-300 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold">{post.title}</h2>
            <p className="text-gray-700 mt-2">{post.content}</p>
            <small className="text-gray-500">By {post.author}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
