import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { likePost } from '../store/blogSlice';
import { AnyAction } from '@reduxjs/toolkit';

interface Props {
  articleId: number;
  likeCount: number;
}

const LikeButton: React.FC<Props> = ({ articleId, likeCount }) => {
  const dispatch = useDispatch();
  const { loading, currentPost } = useSelector((state: any) => state.blog);
  const { isAuthenticated } = useSelector((state: any) => state.auth);
  
  const [likes, setLikes] = useState(likeCount);
  const [liked, setLiked] = useState(false);
  const [likeInProgress, setLikeInProgress] = useState(false);
  
  // Update likes count when currentPost changes
  useEffect(() => {
    if (currentPost && currentPost.id === articleId) {
      setLikes(currentPost.likeCount);
    }
  }, [currentPost, articleId]);
  
  // Update likes from props when they change
  useEffect(() => {
    setLikes(likeCount);
  }, [likeCount]);

  const handleLike = async () => {
    if (!isAuthenticated) {
      // 로그인이 필요한 경우 알림
      const confirmLogin = window.confirm('좋아요를 누르려면 로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?');
      if (confirmLogin) {
        window.location.href = '/login';
      }
      return;
    }
    
    if (likeInProgress) return;
    
    setLikeInProgress(true);
    
    try {
      // Redux 액션을 통해 좋아요 요청 - 명시적 타입 캐스팅 사용
      dispatch(likePost(articleId) as unknown as AnyAction);
      setLiked(true);
      
      // 좋아요 버튼 상태 저장 (로컬 스토리지 사용)
      const likedArticles = JSON.parse(localStorage.getItem('likedArticles') || '[]');
      if (!likedArticles.includes(articleId)) {
        likedArticles.push(articleId);
        localStorage.setItem('likedArticles', JSON.stringify(likedArticles));
      }
    } catch (err) {
      console.error('좋아요 처리 중 오류가 발생했습니다:', err);
    } finally {
      setLikeInProgress(false);
    }
  };
  
  // 이미 좋아요를 눌렀는지 확인 (로컬 스토리지 사용)
  useEffect(() => {
    const likedArticles = JSON.parse(localStorage.getItem('likedArticles') || '[]');
    setLiked(likedArticles.includes(articleId));
  }, [articleId]);

  return (
    <div className="mt-6 flex items-center gap-3">
      <button
        onClick={handleLike}
        disabled={liked || likeInProgress}
        className={`px-4 py-2 rounded-md border text-sm transition ${
          liked ? 'bg-black text-white' : 'bg-white text-black border-black'
        }`}
      >
        {likeInProgress ? '처리 중...' : liked ? '❤️ 좋아요 완료' : '🤍 좋아요'}
      </button>
      <span className="text-sm text-gray-600">좋아요 {likes}개</span>
    </div>
  );
};

export default LikeButton;
