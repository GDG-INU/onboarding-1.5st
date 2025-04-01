import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { getPost, deletePost, fetchRelatedArticles } from '../store/blogSlice';
import ArticleContent from '../components/ArticleContent';
import ArticleHeader from '../components/ArticleHeader';
import LikeButton from '../components/LikeButton';
import CommentSection from '../components/CommentSection';
import RelatedArticles from '../components/RelatedArticles';

// Define the Article interface
interface Article {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  modifiedAt?: string;
  likeCount: number;
  role?: string;
  tags?: string[];
}

// Simple State interface
interface RootState {
  blog: any;
  auth: any;
}

const ArticlePage: React.FC = () => {
  // Use any type for dispatch to avoid TypeScript errors with thunks
  const dispatch = useDispatch<any>();
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
      // Use any to bypass TypeScript type checking
      dispatch(getPost(articleId));
      dispatch(fetchRelatedArticles(articleId));
    }
  }, [articleId, dispatch]);

  useEffect(() => {
    if (success && !currentPost) {
      navigate('/');
    }
  }, [success, currentPost, navigate]);
  
  useEffect(() => {
    if (currentPost) {
      setArticle({
        id: currentPost.id || 0,
        title: currentPost.title || '',
        content: currentPost.content || '',
        author: currentPost.author || currentPost.nickname || '익명',
        createdAt: currentPost.createdAt || new Date().toISOString(),
        modifiedAt: currentPost.modifiedAt,
        likeCount: currentPost.likeCount || 0,
        role: currentPost.role,
        tags: currentPost.tags
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
  
  const confirmDelete = () => {
    if (articleId) {
      dispatch(deletePost(articleId));
      setShowDeleteConfirm(false);
    }
  };
  
  const cancelDelete = () => {
    setShowDeleteConfirm(false);
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

  if (!article) return null;

  // Make sure all values exist before comparison
  const isAuthor = isAuthenticated && user && article.author && (
    (user.email && user.email === article.author) || 
    (user.nickname && user.nickname === article.author)
  );
  
  const isAdmin = isAuthenticated && user && user.role === 'ROLE_ADMIN';

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-10">
      <div className="flex justify-between items-start">
        <ArticleHeader
          title={article.title}
          author={article.author}
          createdAt={article.createdAt}
          updatedAt={article.modifiedAt}
        />
        
        {(isAuthor || isAdmin) && (
          <div className="flex space-x-2">
            <button
              onClick={handleEdit}
              className="px-4 py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 transition"
            >
              수정하기
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
            >
              삭제하기
            </button>
          </div>
        )}
      </div>
      
      {/* 태그 표시 */}
      {article.tags && article.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {article.tags.map((tag, index) => (
            <Link 
              key={index} 
              to={`/tag-search?tag=${encodeURIComponent(tag)}`}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800 hover:bg-gray-200"
            >
              #{tag}
            </Link>
          ))}
        </div>
      )}
      
      <ArticleContent markdown={article.content} />
      
      <LikeButton articleId={article.id} likeCount={article.likeCount} />
      
      <CommentSection />
      
      {/* 관련 게시글 */}
      <RelatedArticles 
        articles={relatedArticles} 
        loading={loading && article} 
        error={error && article}
      />
      
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

export default ArticlePage;
