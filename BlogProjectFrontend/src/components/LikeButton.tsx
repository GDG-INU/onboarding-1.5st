import React, { useState } from 'react';
import axios from 'axios';

interface Props {
  articleId: number;
  likeCount: number;
}

const LikeButton: React.FC<Props> = ({ articleId, likeCount }) => {
  const [likes, setLikes] = useState(likeCount);
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    try {
      const res = await axios.post(`/api/articles/${articleId}/like`);
      setLikes(res.data.likeCount);
      setLiked(true);
    } catch (err) {
      console.error('Like failed:', err);
    }
  };

  return (
    <div className="mt-6 flex items-center gap-3">
      <button
        onClick={handleLike}
        disabled={liked}
        className={`px-4 py-2 rounded-md border text-sm transition ${
          liked ? 'bg-black text-white' : 'bg-white text-black border-black'
        }`}
      >
        {liked ? '❤️ 좋아요 취소' : '🤍 좋아요'}
      </button>
      <span className="text-sm text-gray-600">좋아요 {likes}개</span>
    </div>
  );
};

export default LikeButton;
