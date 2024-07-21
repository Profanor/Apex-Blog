import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import axios from 'axios';
import Spinner from './Spinner';

const PostDetail = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { isAuthenticated, user } = useContext(AuthContext);
  const { postId } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      console.log('Fetching post with ID:', postId);
      try {
        const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000';
        const response = await axios.get(`${apiUrl}/api/posts/${postId}`);
        setPost(response.data.post);
        console.log('Post data fetched successfully:', response.data.post);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch post:', error.response?.data || error.message);
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  const handleDelete = async () => {
    console.log('Attempting to delete post with ID:', postId);
    console.log('Post author:', post.author);
    console.log('Current user:', user.username);
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000';
      await axios.delete(`${apiUrl}/api/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log('Post deleted successfully');
      navigate('/'); // Navigate to the root page after deleting the post
    } catch (error) {
      console.error('Failed to delete post:', error.response?.data || error.message);
    }
  };

  const handleEdit = () => {
    console.log('Navigating to edit post with ID:', postId);
    console.log('Post author:', post.author);
    console.log('Current user:', user.username);
    navigate(`/edit/${postId}`);
  };

  const handleGoBack = () => {
    console.log('Navigating back to posts list');
    navigate('/posts'); 
  };

  // Function to convert ArrayBuffer to base64
  const arrayBufferToBase64 = (buffer) => {
    console.log('Converting ArrayBuffer to base64');
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  if (loading) {
    console.log('Loading post data...');
    return <Spinner />;
  }

  if (!post) {
    console.log('Post not found');
    return <div>Post not found.</div>;
  }

  console.log('Rendering post details');
  console.log('Post author:', post.author);
  console.log('Current user:', user.username);

  return (
    <div className="container mx-auto p-4">
      {post.image && (
        <div className="flex justify-flex-start mb-4">
          <img
            src={`data:${post.image.contentType};base64,${arrayBufferToBase64(post.image.data.data)}`}
            alt="Post"
            className="rounded-lg"
            style={{ maxWidth: '100%', maxHeight: '500px', objectFit: 'contain' }}
          />
        </div>
      )}
      <h1 className="text-3xl font-bold mb-6">{post.title}</h1>
      <p className="text-gray-700 mt-2">{post.content}</p>
      <small className="text-gray-500">By {post.author}</small>
      {isAuthenticated && user.username === post.author && (
        <div className="mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2"
            onClick={handleEdit}
          >
            Edit
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      )}
      
      <div className="mt-4">
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4"
          onClick={handleGoBack}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default PostDetail;
