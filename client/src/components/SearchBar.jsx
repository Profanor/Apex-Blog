import { useState } from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const clearInput = () => {
    setSearchQuery('');
  };

  return (
    <div
      className={`relative transition-all duration-300 ease-in-out ${
        isFocused ? 'w-full max-w-lg' : 'w-full max-w-md'
      }`}
    >
      <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={handleInputChange}
        className="w-full pl-10 pr-10 py-2 rounded-full bg-white backdrop-blur border border-gray-300 text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm transition-all duration-200"
      />

      {/* search icon */}
      <Search className="absolute w-5 h-5 text-gray-400 top-1/2 left-3 -translate-y-1/2 pointer-events-none" />

      {/* clear button */}
      {searchQuery && (
        <button
          onClick={clearInput}
          type="button"
          className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-black focus:outline-none"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
