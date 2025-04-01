import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchUserInfo } from '../store/authSlice';
import { clearSuccess } from '../store/blogSlice';
import api from '../utils/axiosConfig';
import FooterTwo from '../components/FooterTwo';
import TagSearch from '../components/TagSearch';

const Main = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user, loading: authLoading, role } = useSelector((state) => state.auth);
  const { success } = useSelector((state) => state.blog);
  
  const [articleList, setArticleList] = useState([]);
  const [isArticleLoading, setIsArticleLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUserInfo());
    }
  }, [isAuthenticated, dispatch]);
  
  // 블로그 액션 성공 시 성공 메시지 표시
  useEffect(() => {
    if (success) {
      setSuccessMessage('게시글이 정상적으로 삭제되었습니다.');
      fetchArticles(); // 성공 후 게시글 목록 새로고침
      
      // 5초 후 성공 메시지 제거
      const timer = setTimeout(() => {
        setSuccessMessage('');
        dispatch(clearSuccess());
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [success, dispatch]);

  // 게시글 목록 가져오기
  const fetchArticles = async () => {
    try {
      setIsArticleLoading(true);
      const response = await api.get('/api/board');
      setArticleList(response.data || []);
      setIsArticleLoading(false);
    } catch (err) {
      setError('게시글을 불러오는 중 오류가 발생했습니다.');
      setIsArticleLoading(false);
    }
  };
  
  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center px-4 py-16 min-h-screen bg-white">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold">블로그 홈</h1>
          {isAuthenticated && user ? (
            <div className="mt-4">
              <p className="text-lg">안녕하세요, <span className="font-semibold">{user.nickname || user.email}</span>님!</p>
              {user.role === 'ROLE_ADMIN' && (
                <p className="text-sm text-gray-600 mt-1">관리자 권한이 있습니다</p>
              )}
            </div>
          ) : (
            <p className="mt-4">더 많은 기능을 사용하려면 <Link to="/login" className="text-blue-600 underline">로그인</Link>해주세요.</p>
          )}
        </div>

        {/* 성공 메시지 */}
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 flex justify-between items-center">
            <span>{successMessage}</span>
            <button 
              onClick={() => setSuccessMessage('')}
              className="text-green-700 hover:text-green-900"
            >
              ✕
            </button>
          </div>
        )}

        {/* 글쓰기 버튼 */}
        {isAuthenticated && (
          <div className="flex justify-end mb-6">
            <button
              onClick={() => navigate('/write')}
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
            >
              새 글 작성하기
            </button>
          </div>
        )}

        {/* 태그 검색 컴포넌트 추가 */}
        <TagSearch />
        
        {/* 게시글 목록 */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">최근 게시글</h2>
            <button
              onClick={fetchArticles}
              className="text-gray-600 hover:text-black"
              title="새로고침"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
          
          {isArticleLoading ? (
            <div className="text-center py-10">
              <p className="text-gray-600">게시글을 불러오는 중...</p>
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          ) : articleList.length === 0 ? (
            <div className="text-center py-10 border border-gray-200 rounded-lg">
              <p className="text-gray-600">게시글이 없습니다. 첫 게시글을 작성해보세요!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {articleList.map((article) => (
                <div key={article.id} className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200">
                  <div className="flex justify-between">
                    <Link to={`/article?id=${article.id}`} className="text-xl font-semibold hover:text-blue-600">
                      {article.title}
                    </Link>
                    {isAuthenticated && (user?.email === article.author || user?.nickname === article.author || user?.role === 'ROLE_ADMIN') && (
                      <div className="flex space-x-2">
                        <Link 
                          to={`/edit-article?id=${article.id}`}
                          className="text-sm text-gray-600 hover:text-black"
                        >
                          수정하기
                        </Link>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-600 mt-2 text-sm">
                    작성자: {article.author || article.nickname || '익명'} • 
                    {new Date(article.createdAt).toLocaleDateString('ko-KR')}
                  </p>
                  <p className="mt-3 text-gray-700 line-clamp-2">
                    {article.content.replace(/#{1,6}\s|[*_~`>]/g, '')}
                  </p>
                  <Link 
                    to={`/article?id=${article.id}`}
                    className="inline-block mt-4 text-blue-600 hover:underline"
                  >
                    계속 읽기
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Footer component */}
      <FooterTwo />
    </div>
  );
};

export default Main;
