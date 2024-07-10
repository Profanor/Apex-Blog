import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = ({ isVisible }) => {
  const [isHidden, setIsHidden] = useState(false);

  const toggleFooterVisibility = () => {
    setIsHidden(!isHidden);
  };

  if (!isVisible && isHidden) {
    return null; // Don't render the footer if isVisible is false and isHidden is true
  }

  return (
    <footer className={`footer bg-black text-white fixed bottom-0 left-0 right-0 flex justify-end items-center h-12 ${isHidden ? 'hidden' : ''}`} onClick={toggleFooterVisibility}>
      <p className="font-sans text-sm ml-4">Created by David Arinze</p>
      <Link to="https://www.linkedin.com/in/david-arinze-5766161a1/">
        <button className="btn2 mr-4" type="button">
          <img
            src="/images/linkedIn.jpeg"
            alt="LinkedIn Icon"
            className="h-6 w-6"
          />
        </button>
      </Link>
      <Link to="https://github.com/Profanor">
        <button className="btn3 mr-4" type="button">
          <img
            src="/images/OIP.jpeg"
            alt="GitHub Icon"
            className="h-6 w-6"
          />
        </button>
      </Link>
    </footer>
  );
};

export default Footer;
