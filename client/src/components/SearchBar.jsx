import React from 'react';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={handleInputChange}
        className="px-4 py-2 bg-white mr-2 text-black pl-10"
      />
      <i className="absolute top-0 left-0 mt-3 ml-3 text-gray-400 fa-solid fa-magnifying-glass"></i>
    </div>
  );
};

export default SearchBar;
