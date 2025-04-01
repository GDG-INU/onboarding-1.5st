import React from 'react';
import { Link } from 'react-router-dom';

const RelatedArticles = ({ articles, loading, error }) => {
  if (loading) {
    return <div className="text-gray-600 text-center py-4">관련 게시글을 불러오는 중...</div>;
  }

  if (error) {
    return <div className="text-red-600 text-center py-4">관련 게시글을 불러오는데 실패했습니다.</div>;
  }

  if (!articles || articles.length === 0) {
    return <div className="text-gray-600 text-center py-4">관련 게시글이 없습니다.</div>;
  }

  return (
    <div className="mt-8 border-t pt-6">
      <h3 className="text-xl font-semibold mb-4">관련 게시글</h3>
      <div className="space-y-4">
        {articles.map(article => (
          <div key={article.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
            <Link 
              to={`/article?id=${article.id}`} 
              className="block"
            >
              <h4 className="font-medium text-lg hover:text-blue-600 transition-colors">
                {article.title}
              </h4>
              <div className="flex items-center text-sm text-gray-500 mt-2">
                <span>{article.author || '익명'}</span>
                <span className="mx-2">•</span>
                <span>{new Date(article.createdAt).toLocaleDateString('ko-KR')}</span>
                {article.role === 'ADMIN' && (
                  <>
                    <span className="mx-2">•</span>
                    <span className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded">관리자</span>
                  </>
                )}
              </div>
              <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                {article.content}
              </p>
              <div className="flex items-center mt-2 text-sm text-gray-500">
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  {article.likeCount}
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedArticles;
