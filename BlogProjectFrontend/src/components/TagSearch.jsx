import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TagSearch = () => {
  const [searchTag, setSearchTag] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTag.trim()) return;
    
    // Navigate to search results page with the tag as query parameter
    navigate(`/tag-search?tag=${encodeURIComponent(searchTag.trim())}`);
    setSearchTag('');
  };

  return (
    <div className="mb-6">
      <form onSubmit={handleSearch} className="flex">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
          </div>
          <input
            type="text"
            value={searchTag}
            onChange={(e) => setSearchTag(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
            placeholder="태그 검색 (예: Spring, React)"
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300"
        >
          검색
        </button>
      </form>
    </div>
  );
};

export default TagSearch;
