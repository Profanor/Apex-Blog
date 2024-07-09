import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import { useAuthenticationStatus } from '../useAuthStatus';

const PostDetail = () => {
  const [post, setPost] = useState(null);
  const { isAuthenticated } = useAuthenticationStatus();
  const { userId } = useContext(AuthContext); // Correctly getting userId from AuthContext
  const { postId } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/posts/${postId}`);
        setPost(response.data.post);
      } catch (error) {
        console.error('Failed to fetch post:', error.response?.data || error.message);
      }
    };

    fetchPost();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:4000/api/posts/${postId}`);
      // Optionally: Redirect user after successful delete
    } catch (error) {
      console.error('Failed to delete post:', error.response?.data || error.message);
    }
  };

  // Function to convert ArrayBuffer to base64
  const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">{post.title}</h1>
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
      {isAuthenticated && ( // Render edit and delete buttons only if authenticated
        <div className="mt-4">
          {post.userId.toString() === userId && ( // Comparing userId from post with userId from AuthContext
            <>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2"
                onClick={() => {
                  // Handle edit functionality
                }}>
                Edit
              </button>
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4"
                onClick={handleDelete}>
                Delete
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default PostDetail;
