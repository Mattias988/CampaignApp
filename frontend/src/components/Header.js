import React from 'react';
import SearchBar from './SearchBar';

const Header = ({ onAddCampaign, searchQuery, setSearchQuery }) => {
  return (
    <header className="bg-gradient-to-r from-blue-300 to-blue-800 p-4 text-white flex flex-col md:flex-row justify-between items-center shadow-xl">
        <div className="flex flex-col md:flex-row items-center sm:w-auto md:w-72 shadow-lg ">
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>
        <div className=''>
            <img src="/logo.png" alt='Campaigns' width="150px" height="150px" className=""/>
        </div>
        <button 
            onClick={onAddCampaign} 
            className="bg-white text-blue-600 px-4 py-2 rounded mt-4 md:mt-0 shadow-lg hover:scale-110"
        >
            Add Campaign
        </button>
    </header>
  );
};

export default Header;
