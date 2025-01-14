import React, { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';

const Spinner = () => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className="flex justify-center items-center mt-4">
      <div className={`animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 ${darkMode ? 'border-white' : 'border-gray-900'}`}></div>
    </div>
  );
};

export default Spinner;
