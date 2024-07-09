import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showModal, setShowModal] = useState(false);
  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000';
        const response = await axios.get(`${apiUrl}/api/posts/${postId}`);
        const { title, content } = response.data.post;
        setTitle(title);
        setContent(content);
      } catch (error) {
        console.error('Failed to fetch post:', error.response?.data || error.message);
      }
    };

    fetchPost();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000';
      await axios.put(
        `${apiUrl}/api/posts/${postId}`,
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // Show success modal
      setShowModal(true);

      // Navigate back to the post detail page after a delay
      setTimeout(() => {
        navigate(`/posts/${postId}`);
      }, 1500);
    } catch (error) {
      console.error('Failed to update post:', error.response?.data || error.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Edit Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-gray-700 font-bold mb-2">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-64"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => navigate(`/posts/${postId}`)}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
        </div>
      </form>

      {/* Modal for showing post updated successfully */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-auto max-w-sm mx-auto my-6">
            <div className="bg-white rounded-lg shadow-lg">
              <div className="flex flex-col items-start p-4">
                <div className="flex items-center mb-4">
                  <div className="bg-green-500 rounded-full h-12 w-12 flex items-center justify-center">
                    <svg
                      className="h-8 w-8 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm4.243 6.535a.75.75 0 0 1 1.06 1.06l-7.5 7.5a.75.75 0 0 1-1.06 0l-3.5-3.5a.75.75 0 0 1 1.06-1.06l3.022 3.022 6.94-6.94z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-lg font-semibold ml-2">Success!</h2>
                </div>
                <p className="text-gray-600">Post updated successfully.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditPost;
