import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import Spinner from './Spinner';

const PostDetail = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, user } = useContext(AuthContext);
  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000';
        const response = await axios.get(`${apiUrl}/api/posts/${postId}`);
        setPost(response.data.post);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch post:', error.response?.data || error.message);
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  const handleDelete = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000';
      await axios.delete(`${apiUrl}/api/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      navigate('/');
    } catch (error) {
      console.error('Failed to delete post:', error.response?.data || error.message);
    }
  };

  const handleEdit = () => {
    navigate(`/edit/${postId}`);
  };

  const handleGoBack = () => {
    navigate('/posts');
  };

  const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  if (loading) return <Spinner />;
  if (!post) return <div className="text-center text-gray-600">Post not found.</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6">
        {post.image && (
          <div className="mb-6">
            <img
              src={`data:${post.image.contentType};base64,${arrayBufferToBase64(post.image.data.data)}`}
              alt="Post"
              className="rounded-lg w-full object-cover max-h-[400px] shadow"
            />
          </div>
        )}

        <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>

        <p className="text-gray-800 leading-relaxed mb-6 whitespace-pre-line">{post.content}</p>

        <div className="flex justify-between items-center text-sm text-gray-500 mb-6">
          <span>By {post.author}</span>
          <span>{new Date(post.creationDate).toLocaleDateString()}</span>
        </div>

        {isAuthenticated && user.username === post.author && (
          <div className="flex space-x-4 mb-4">
            <button
              onClick={handleEdit}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
            >
              ✏️ Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow"
            >
              🗑️ Delete
            </button>
          </div>
        )}

        <button
          onClick={handleGoBack}
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded shadow"
        >
          ← Go Back
        </button>
      </div>
    </div>
  );
};

export default PostDetail;
