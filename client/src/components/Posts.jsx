import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [postCreated, setPostCreated] = useState(false);
  const navigate = useNavigate();

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const clearForm = () => {
    setTitle('');
    setContent('');
    setImage(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title.trim() || !content.trim()) {
      setError('All fields are required');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) {
      formData.append('image', image);
    }

    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000';
      const response = await axios.post(`${apiUrl}/api/posts`, formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        },
      });

      if (response.status === 201) {
        setPostCreated(true);
        setTimeout(() => {
          navigate('/posts');
          clearForm();
        }, 2000);
      } else {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error('Error creating post:', error.message);
      setError('Failed to create post. Please try again later.');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-12 p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Create a New Post</h1>
      {error && (
        <div className="mb-4 text-red-600 font-semibold">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-indigo-200 text-gray-800"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={handleContentChange}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-indigo-200 text-gray-800"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image:</label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            accept="image/*"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-indigo-200 text-gray-800"
          />
        </div>
        {image && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Image Preview:</label>
            <img src={URL.createObjectURL(image)} alt="Preview" className="mt-1 w-full h-auto" />
            <button
              type="button"
              onClick={() => setImage(null)}
              className="mt-2 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
            >
              Remove Image
            </button>
          </div>
        )}
        <div className="flex justify-between">
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700">
            Create Post
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700">
            Go Back
          </button>
        </div>
      </form>

      {/* Modal for showing post created successfully */}
      {postCreated && (
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
                <p className="text-gray-600">Post created successfully.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePost;
