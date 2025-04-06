import React, { useState } from 'react';

const MarkdownEditor = ({ value, onChange, placeholder }) => {
  const [content, setContent] = useState(value || '');
  
  const handleChange = (e) => {
    const newContent = e.target.value;
    setContent(newContent);
    if (onChange) {
      onChange(newContent);
    }
  };
  
  return (
    <div className="w-full">
      <textarea
        className="w-full h-64 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        value={content}
        onChange={handleChange}
        placeholder={placeholder || '내용을 입력하세요. (마크다운 형식 지원)'}
      />
      
      {/* 미리보기 기능은 향후 추가 가능 */}
    </div>
  );
};

export default MarkdownEditor;
