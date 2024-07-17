import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Spinner from './Spinner';

const Posts = ({ searchQuery }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem('token');
        const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000';
        const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

        const response = await axios.get(`${apiUrl}/api/posts`, config);
        setPosts(response.data.posts);
        setLoading(false); 
      } catch (error) {
        console.error('Failed to fetch posts:', error.response?.data || error.message);
        setLoading(false); 
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to convert ArrayBuffer to base64
  const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  // Function to truncate text
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return `${text.substring(0, maxLength)}...`;
  };

  return (
    <div className="min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Blog Posts</h1>
      
      {loading ? (
        <Spinner /> 
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredPosts.map((post) => (
            <Link key={post._id} to={`/posts/${post._id}`}>
              <div
                className="p-4 border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition duration-300 flex flex-col"
                style={{ cursor: 'pointer', height: '400px' }} 
              >
                {post.image && (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={`data:${post.image.contentType};base64,${arrayBufferToBase64(post.image.data.data)}`}
                      alt="Post"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                )}
                <h2 className="text-2xl font-semibold mt-4">{post.title}</h2>
                <p className="text-black-700 mt-2">{truncateText(post.content, 100)}</p>
                <Link to={`/posts/${post._id}`} className="text-blue-600 hover:underline mt-2">Read More</Link>
                <div className="flex items-center space-x-4 mt-2">
                </div>
                <small className="text-gray-500 mt-2">By {post.author}</small>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-4 text-center">
        <p className="text-lg text-black-600">Want to create a post? <Link to="/signup" className="text-blue-600 hover:underline">Sign up</Link> now!</p>
      </div>
    </div>
  );
};

export default Posts;
