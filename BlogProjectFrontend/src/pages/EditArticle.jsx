import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import MarkdownEditor from '../components/MarkdownEditor';
import TagInput from '../components/TagInput';
import { getPost, updatePost, deletePost, clearSuccess, clearError, addTagsToPost } from '../store/blogSlice';

const EditArticle = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { currentPost, loading, error, success } = useSelector((state) => state.blog);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  // Get article ID from URL query parameters
  const searchParams = new URLSearchParams(location.search);
  const articleId = searchParams.get('id');
  
  useEffect(() => {
    // 인증되지 않은 사용자는 로그인 페이지로 리다이렉트
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    // 게시글 ID가 없으면 목록으로 이동
    if (!articleId) {
      navigate('/');
      return;
    }
    
    // 게시글 정보 가져오기
    dispatch(getPost(articleId));
    
    return () => {
      dispatch(clearError());
    };
  }, [isAuthenticated, articleId, dispatch, navigate]);
  
  // 게시글 정보가 로드되면 폼에 채우기
  useEffect(() => {
    if (currentPost) {
      setTitle(currentPost.title || '');
      setContent(currentPost.content || '');
      setTags(currentPost.tags || []);
    }
  }, [currentPost]);
  
  // 성공적으로 수정되면 게시글 페이지로 이동
  useEffect(() => {
    if (success) {
      dispatch(clearSuccess());
      
      // 게시글이 삭제된 경우 목록으로 이동
      if (!currentPost) {
        navigate('/');
      } else {
        navigate(`/article?id=${articleId}`);
      }
    }
  }, [success, articleId, navigate, dispatch, currentPost]);
  
  // 작성자나 관리자인지 확인
  const isAuthorOrAdmin = () => {
    if (!isAuthenticated || !user || !currentPost) return false;
    
    const isAuthor = 
      (user.email && currentPost.author === user.email) || 
      (user.nickname && currentPost.author === user.nickname);
    const isAdmin = user.role === 'ROLE_ADMIN';
    
    return isAuthor || isAdmin;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }
    
    dispatch(updatePost({
      id: articleId,
      postData: {
        title,
        content
      }
    }));
  };
  
  const handleTagsChange = (newTags) => {
    setTags(newTags);
  };
  
  const handleSaveTags = () => {
    if (tags.length === 0) {
      alert('태그를 하나 이상 입력해주세요.');
      return;
    }
    
    dispatch(addTagsToPost({
      postId: articleId,
      tags
    }));
  };
  
  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };
  
  const confirmDelete = () => {
    dispatch(deletePost(articleId));
    setShowDeleteConfirm(false);
  };
  
  const cancelDelete = () => {
    setShowDeleteConfirm(false);
  };
  
  // 권한이 없을 경우
  if (currentPost && !loading && !isAuthorOrAdmin()) {
    return (
      <div className="flex flex-col items-center justify-center px-4 py-16 min-h-screen bg-white">
        <div className="w-full max-w-4xl text-center">
          <h1 className="text-3xl font-bold mb-4">
            접근 권한이 없습니다
          </h1>
          <p className="text-gray-600 mb-4">
            이 게시글을 수정할 권한이 없습니다. 작성자나 관리자만 수정할 수 있습니다.
          </p>
          <button
            onClick={() => navigate(`/article?id=${articleId}`)}
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
          >
            게시글로 돌아가기
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col items-center justify-center px-4 py-16 min-h-screen bg-white">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-4">
          게시글 수정
        </h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        {loading && !currentPost ? (
          <div className="text-center p-10">
            <p className="text-gray-600">게시글을 불러오는 중...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  제목
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="제목을 입력하세요"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                  내용
                </label>
                <MarkdownEditor
                  value={content}
                  onChange={setContent}
                  placeholder="마크다운 형식으로 내용을 입력하세요"
                />
              </div>
              
              <div>
                <TagInput
                  initialTags={tags}
                  onTagsChange={handleTagsChange}
                />
                <button
                  type="button"
                  onClick={handleSaveTags}
                  className="mt-2 px-4 py-2 text-sm bg-gray-100 text-gray-800 rounded hover:bg-gray-200 transition"
                >
                  태그 저장
                </button>
              </div>
              
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={handleDelete}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  삭제하기
                </button>
                
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => navigate(`/article?id=${articleId}`)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-400"
                  >
                    {loading ? '수정 중...' : '수정하기'}
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
      
      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">게시글 삭제</h3>
            <p className="text-gray-700 mb-6">
              정말로 이 게시글을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-100"
              >
                취소
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                삭제하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditArticle;
