import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { getPost, deletePost, fetchRelatedArticles, likePost } from '../store/blogSlice';
import { AppDispatch, RootState, Article } from '../store/blogSlice';

import ArticleContent from '../components/ArticleContent';
import ArticleHeader from '../components/ArticleHeader';
import LikeButton from '../components/LikeButton';
import CommentSection from '../components/CommentSection';
import RelatedArticles from '../components/RelatedArticles';

const ArticlePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const { currentPost, loading, error, success, relatedArticles } = useSelector((state: RootState) => state.blog);
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  
  const searchParams = new URLSearchParams(location.search);
  const articleId = searchParams.get('id');
  
  const [article, setArticle] = useState<Article | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  useEffect(() => {
    if (articleId) {
      dispatch(getPost(articleId));
      dispatch(fetchRelatedArticles(articleId));
    }
  }, [articleId, dispatch]);

  useEffect(() => {
    if (success && location.state?.from === 'delete') {
      navigate('/');
    } else if (success && !currentPost && !loading) {
    }
  }, [success, currentPost, loading, navigate, location.state]);
  
  useEffect(() => {
    if (currentPost) {
      setArticle({
        id: currentPost.id,
        title: currentPost.title,
        content: currentPost.content,
        author: currentPost.author || currentPost.nickname || '익명',
        createdAt: currentPost.createdAt,
        modifiedAt: currentPost.modifiedAt || currentPost.updatedAt,
        likeCount: currentPost.likeCount,
        role: currentPost.role,
        tags: Array.isArray(currentPost.tags) ? currentPost.tags : [] 
      });
    }
  }, [currentPost]);
  
  const handleEdit = () => {
    if (articleId) {
      navigate(`/edit-article?id=${articleId}`);
    }
  };
  
  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };
  
  const confirmDelete = async () => {
    if (articleId) {
      await dispatch(deletePost(articleId));
      navigate(location.pathname + location.search, { state: { from: 'delete' } });
      setShowDeleteConfirm(false);
    }
  };
  
  const cancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  const handleLike = () => {
    if (article && article.id) {
      dispatch(likePost(article.id));
    }
  };
  
  if (loading && !article) return <div className="text-center mt-20">로딩 중...</div>;
  
  if (error && !article) return (
    <div className="text-center mt-20">
      <p className="text-red-600">에러: {error}</p>
      <button 
        onClick={() => navigate('/')}
        className="mt-4 px-4 py-2 bg-black text-white rounded"
      >
        메인으로 돌아가기
      </button>
    </div>
  );

  if (!article) return (
      <div className="text-center mt-20">
        <p>게시글을 찾을 수 없습니다.</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 px-4 py-2 bg-black text-white rounded"
        >
          메인으로 돌아가기
        </button>
      </div>
    );

  const isAuthor = isAuthenticated && user && article.author && 
                   ((user.email && user.email === article.author) || 
                    (user.nickname && user.nickname === article.author));
  
  const isAdmin = isAuthenticated && user && user.role === 'ROLE_ADMIN';

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <ArticleHeader 
        title={article.title} 
        author={article.author || '익명'} 
        createdAt={article.createdAt} 
        updatedAt={article.modifiedAt || article.createdAt} 
      />
      
      {article.tags && article.tags.length > 0 && (
        <div className="mt-4 mb-4 flex flex-wrap gap-2">
          {article.tags.map(tag => (
            <Link 
              key={tag} 
              to={`/tag-search?name=${encodeURIComponent(tag)}`} 
              className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm hover:bg-gray-300"
            >
              #{tag}
            </Link>
          ))}
        </div>
      )}
      
      <ArticleContent markdown={article.content} />
      
      <div className="mt-8 flex justify-between items-center">
        <LikeButton 
          articleId={article.id} 
          likeCount={article.likeCount}
        />
        
        {(isAuthor || isAdmin) && (
          <div className="flex space-x-2">
            <button onClick={handleEdit} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">수정</button>
            <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">삭제</button>
          </div>
        )}
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <p className="mb-4">정말로 이 게시글을 삭제하시겠습니까?</p>
            <div className="flex justify-end space-x-2">
              <button onClick={cancelDelete} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">취소</button>
              <button onClick={confirmDelete} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">삭제 확인</button>
            </div>
          </div>
        </div>
      )}

      <CommentSection />
      
      {relatedArticles && (
        <RelatedArticles 
          articles={relatedArticles} 
          loading={loading}
          error={error || null}
        />
      )}
    </div>
  );
};

export default ArticlePage;
