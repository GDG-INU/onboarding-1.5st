import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { searchPostsByTag } from '../store/blogSlice';
import TagSearch from '../components/TagSearch';

const TagSearchResults = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { searchResults, loading, error } = useSelector((state) => state.blog);
  
  const [tag, setTag] = useState('');
  
  // Get query parameter
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tagParam = searchParams.get('tag');
    
    if (tagParam) {
      setTag(tagParam);
      dispatch(searchPostsByTag(tagParam));
    } else {
      navigate('/');
    }
  }, [location.search, dispatch, navigate]);
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">태그 검색</h1>
      
      <TagSearch />
      
      <div className="mb-4">
        <span className="text-lg font-medium mr-2">검색 태그:</span>
        <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full">{tag}</span>
      </div>
      
      {loading && (
        <div className="text-center py-10">
          <p className="text-gray-600">검색 결과를 불러오는 중...</p>
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
        </div>
      )}
      
      {!loading && !error && searchResults.length === 0 && (
        <div className="text-center py-10 border rounded-lg">
          <p className="text-gray-600">검색 결과가 없습니다.</p>
        </div>
      )}
      
      {!loading && searchResults.length > 0 && (
        <div className="space-y-6">
          <p className="text-gray-600 mb-4">검색 결과: {searchResults.length}개</p>
          
          {searchResults.map((post) => (
            <div key={post.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition">
              <Link to={`/article?id=${post.id}`} className="block">
                <h2 className="text-xl font-medium text-gray-900 hover:text-blue-600 transition">
                  {post.title}
                </h2>
                <p className="text-gray-600 mt-2 line-clamp-2">
                  {post.content && post.content.replace(/<[^>]*>/g, '').substring(0, 150)}
                  {post.content && post.content.length > 150 ? '...' : ''}
                </p>
                <div className="flex items-center mt-3 text-sm text-gray-500">
                  <span>{formatDate(post.createdAt)}</span>
                  {post.updatedAt && post.updatedAt !== post.createdAt && (
                    <>
                      <span className="mx-2">•</span>
                      <span>수정됨: {formatDate(post.updatedAt)}</span>
                    </>
                  )}
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-8">
        <button 
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 transition"
        >
          메인으로 돌아가기
        </button>
      </div>
    </div>
  );
};

export default TagSearchResults;
