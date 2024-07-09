import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [postCreated, setPostCreated] = useState(false); 
  const [image, setImage] = useState(null);
  const [error, setError] = useState(''); 

  const navigate = useNavigate();

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };
  
  const handleGoBack = () => {
    navigate('/');
  };

  const clearForm = () => {
    setTitle('');
    setContent('');
    setAuthor('');
    setImage(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!title.trim() || !content.trim() || !author.trim()) {
      alert('All fields cannot be empty');
      return;
    }
  
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('author', author);
    if (image) {
      formData.append('image', image);
    }
  
    try {
      const response = await axios.post('http://localhost:4000/api/posts', formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        },
      });
  
      if (response.status === 201) { 
        setPostCreated(true);
        setTimeout(() => {
          navigate('/posts');
          clearForm(); // Reset the form fields
        }, 2000);
      } else {
        throw new Error('Unexpected response code');
      }
    } catch (error) {
      console.error('Error creating post:', error.message);
      setError('Failed to create post. Please try again later.');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-12 p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Create a New Post</h1>
      {postCreated && ( 
        <div className="mb-4 text-green-600 font-semibold">
          Post created successfully!
        </div>
      )}
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
          <label htmlFor="author" className="block text-sm font-medium text-gray-700">Author:</label>
          <input 
            type="text" 
            id="author" 
            value={author} 
            onChange={handleAuthorChange} 
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
            <img src={URL.createObjectURL(image)} alt="Image Preview" className="mt-1 w-full h-auto" />
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
            onClick={handleGoBack}
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700">
            Go Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
