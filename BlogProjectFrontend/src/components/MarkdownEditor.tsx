import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import TextareaAutosize from 'react-textarea-autosize';

const MarkdownEditor: React.FC = () => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [content, setContent] = useState('');

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* 제목 */}
      <div>
        <label className="block mb-1 font-semibold text-lg">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter the title"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      {/* 마크다운 입력 + 미리보기 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 입력 영역 */}
        <div className="flex flex-col">
          <label className="mb-2 font-semibold text-lg">Markdown Input</label>
          <TextareaAutosize
            minRows={20}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your blog post using Markdown..."
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black font-mono resize-none"
          />
        </div>

        {/* 미리보기 */}
        <div className="flex flex-col">
          <label className="mb-2 font-semibold text-lg">Live Preview</label>
          <div className="prose prose-slate p-4 border border-gray-300 rounded-lg overflow-auto bg-white min-h-[320px]">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content || 'Nothing to preview yet...'}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarkdownEditor;
