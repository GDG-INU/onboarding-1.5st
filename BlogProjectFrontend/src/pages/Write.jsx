import React from 'react';
import MarkdownEditor from '../components/MarkdownEditor';

const Write = () => {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-16 min-h-screen bg-white">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-4">
          Create a New Post
        </h1>
        <MarkdownEditor />
        <div className="flex justify-end mt-6">
          <button className="px-6 py-2 bg-black text-gray-600 rounded-lg hover:bg-gray-800">
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};

export default Write;
