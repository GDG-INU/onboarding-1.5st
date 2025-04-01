import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MarkdownEditor from '../components/MarkdownEditor';
import TagInput from '../components/TagInput';
import { createPost, clearSuccess, clearError } from '../store/blogSlice';

const Write = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success, currentPost } = useSelector((state) => state.blog);
  const { isAuthenticated } = useSelector((state) => state.auth);
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  
  useEffect(() => {
    // 인증되지 않은 사용자는 로그인 페이지로 리다이렉트
    if (!isAuthenticated) {
      navigate('/login');
    }
    
    // 성공적으로 게시글이 작성된 경우, 해당 게시글 페이지로 이동
    if (success && currentPost) {
      dispatch(clearSuccess());
      navigate(`/article?id=${currentPost.id}`);
    }
    
    return () => {
      dispatch(clearError());
    };
  }, [isAuthenticated, success, currentPost, navigate, dispatch]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }
    
    if (!content.trim()) {
      alert('내용을 입력해주세요.');
      return;
    }
    
    // 게시글 생성 요청 (태그 포함)
    dispatch(createPost({
      title,
      content,
      tags
    }));
  };
  
  const handleTagsChange = (newTags) => {
    setTags(newTags);
  };
  
  return (
    <div className="flex flex-col items-center justify-center px-4 py-16 min-h-screen bg-white">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-4">
          게시글 작성
        </h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-semibold mb-2">
              제목
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력하세요"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="content" className="block text-sm font-semibold mb-2">
              내용
            </label>
            <MarkdownEditor 
              value={content} 
              onChange={setContent} 
              placeholder="내용을 입력하세요. 마크다운 형식을 지원합니다."
            />
          </div>
          
          <div className="mb-6">
            <TagInput
              initialTags={tags}
              onTagsChange={handleTagsChange}
            />
          </div>
          
          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg mr-2 hover:bg-gray-100"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-400"
            >
              {loading ? '게시 중...' : '게시하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Write;
