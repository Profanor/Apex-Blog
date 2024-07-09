import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import axios from 'axios';

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
  
        const response = await axios.get('http://localhost:4000/api/posts', config);
        setPosts(response.data.posts);
      } catch (error) {
        console.error('Failed to fetch posts:', error.response?.data || error.message);
      }
    };
  
    fetchPosts();
  }, []);

  // Function to convert ArrayBuffer to base64
  const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  return (
    <div>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
        {posts.map((post) => (
          <Link key={post._id} to={`/posts/${post._id}`}>
            <div className="mb-4 p-4 border border-gray-300 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold">{post.title}</h2>
              <p className="text-gray-700 mt-2">{post.content}</p>
              <small className="text-gray-500">By {post.author}</small>
              {post.image && (
                <div className="mt-4 max-w-full overflow-hidden" style={{ maxHeight: '600px' }}>
                  <img
                    src={`data:${post.image.contentType};base64,${arrayBufferToBase64(post.image.data.data)}`}
                    alt="Post"
                    className="rounded-lg"
                    style={{ maxWidth: '100%', height: 'auto' }}
                  />
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Posts;
