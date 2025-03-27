import React from 'react';

const mockComments = [
  {
    id: 1,
    author: 'Alice',
    text: '좋은 글 감사합니다!',
    createdAt: '2025-03-26',
  },
  { id: 2, author: 'Bob', text: '유용하게 읽었어요.', createdAt: '2025-03-27' },
];

const CommentSection = () => {
  return (
    <div className="space-y-4 mt-10">
      <h2 className="text-xl font-semibold">댓글</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert('댓글 작성 기능은 나중에 연결됩니다.');
        }}
        className="space-y-2"
      >
        <textarea
          className="w-full border rounded-md p-2 text-sm"
          rows={3}
          placeholder="댓글을 작성해보세요..."
        />
        <button
          type="submit"
          className="px-4 py-2 bg-black text-gray-600 rounded-md text-sm"
        >
          댓글 작성
        </button>
      </form>

      <div className="space-y-3">
        {mockComments.map((comment) => (
          <div key={comment.id} className="border p-3 rounded-md">
            <p className="text-sm font-semibold">{comment.author}</p>
            <p className="text-sm text-gray-700 mt-1">{comment.text}</p>
            <p className="text-xs text-gray-400 mt-1">{comment.createdAt}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
