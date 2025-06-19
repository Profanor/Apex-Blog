import React, { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { ThemeContext } from '../ThemeContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  // fake stats for now
  const joinedDate = 'May 2024';
  const postCount = 12;

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
      <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-3xl p-8 w-full max-w-xl border border-blue-300 dark:border-gray-600">
        <div className="flex flex-col items-center space-y-4">
          {user.profilePicture ? (
            <img
              src={user.profilePicture}
              alt={user.username}
              className="w-32 h-32 rounded-full border-4 border-purple-500 object-cover shadow-lg"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-400 text-white flex items-center justify-center text-4xl font-bold border-4 border-purple-500">
              {user.username.charAt(0).toUpperCase()}
            </div>
          )}
          <h2 className="text-2xl font-bold">{user.username}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Joined {joinedDate}</p>
        </div>

        {/* stats */}
        <div className="mt-6 grid grid-cols-2 gap-4 text-center">
          <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-xl">
            <h4 className="text-lg font-semibold">Posts</h4>
            <p className="text-2xl font-bold">{postCount}</p>
          </div>
          <div className="bg-green-100 dark:bg-green-900 p-4 rounded-xl">
            <h4 className="text-lg font-semibold">Rank</h4>
            <p className="text-2xl font-bold">Genin</p>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/edit-profile')}
            className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg transition"
          >
            Edit Profile
          </button>
          <button
            onClick={() => navigate('/change-password')}
            className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition"
          >
            Change Password
          </button>
          <button
            onClick={() => navigate(`/user/${user.id}/posts`)}
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition"
          >
            My Posts
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
