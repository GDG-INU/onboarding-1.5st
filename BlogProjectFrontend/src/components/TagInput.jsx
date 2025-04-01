import React, { useState, useEffect } from 'react';

const TagInput = ({ initialTags = [], onTagsChange }) => {
  const [tags, setTags] = useState(initialTags || []);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    // Update tags when initialTags prop changes
    if (initialTags && JSON.stringify(initialTags) !== JSON.stringify(tags)) {
      setTags(initialTags);
    }
  }, [initialTags]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    } else if (e.key === 'Backspace' && inputValue === '' && tags.length > 0) {
      // Remove the last tag if backspace is pressed and input is empty
      const newTags = [...tags];
      newTags.pop();
      setTags(newTags);
      if (onTagsChange) {
        onTagsChange(newTags);
      }
    }
  };

  const addTag = () => {
    const trimmedInput = inputValue.trim();
    if (trimmedInput === '') return;
    
    // Remove commas and normalize
    const tagToAdd = trimmedInput.replace(/,/g, '');
    
    if (tagToAdd !== '' && !tags.includes(tagToAdd)) {
      const newTags = [...tags, tagToAdd];
      setTags(newTags);
      if (onTagsChange) {
        onTagsChange(newTags);
      }
    }
    setInputValue('');
  };

  const removeTag = (tagToRemove) => {
    const newTags = tags.filter(tag => tag !== tagToRemove);
    setTags(newTags);
    if (onTagsChange) {
      onTagsChange(newTags);
    }
  };

  const handleBlur = () => {
    if (inputValue.trim() !== '') {
      addTag();
    }
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        해시태그
      </label>
      <div className="flex flex-wrap items-center p-2 border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-black">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="flex items-center bg-gray-100 text-gray-800 rounded-full px-3 py-1 m-1"
          >
            <span className="mr-1">#{tag}</span>
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
        <input
          type="text"
          className="flex-grow outline-none p-1 text-sm"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          onBlur={handleBlur}
          placeholder={tags.length === 0 ? "태그를 입력하고 Enter 또는 쉼표(,)로 구분하세요" : ""}
        />
      </div>
      <p className="mt-1 text-xs text-gray-500">
        Enter 또는 쉼표(,)를 눌러 태그를 추가하세요
      </p>
    </div>
  );
};

export default TagInput;
