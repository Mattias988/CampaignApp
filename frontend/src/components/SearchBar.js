import React from 'react';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <input
      type="text"
      placeholder="Search campaigns by keywords..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="p-2 border rounded w-full text-black"
    />
  );
};

export default SearchBar;
