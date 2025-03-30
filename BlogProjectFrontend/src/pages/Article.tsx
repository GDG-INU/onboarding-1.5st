import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ArticleContent from '../components/ArticleContent';
import ArticleHeader from '../components/ArticleHeader';
import LikeButton from '../components/LikeButton';
import CommentSection from '../components/CommentSection';

interface Article {
  Id: number;
  title: string;
  content: string;
  userId: string;
  createdAt: string;
  modifiedAt: string;
  likeCount: number;
}

// 목업데이터

const mockArticle: Article = {
  Id: 1,
  title: '🔥 React의 상태 관리 완전 정복!',
  content: `
## 상태 관리는 왜 필요할까?

React에서 상태란 컴포넌트의 데이터를 의미해요.  
예를 들어, 버튼을 클릭했을 때 UI가 바뀌는 건 상태가 변하기 때문이죠.

\`\`\`js
const [count, setCount] = useState(0);

return (
  <button onClick={() => setCount(count + 1)}>
    Clicked {count} times
  </button>
);
\`\`\`

### 전역 상태 관리가 필요한 상황

- 여러 컴포넌트가 동일한 데이터를 사용할 때
- 깊은 컴포넌트 트리를 props로 넘기기 어렵고 번거로울 때

### 결론

- 간단한 상태: useState
- 중간 복잡도: Context API
- 복잡한 상태 + 비동기: Redux Toolkit이나 Zustand
  `,
  userId: 'frontend_master',
  createdAt: '2025-03-18T12:34:56',
  modifiedAt: '2025-03-18T13:22:01',
  likeCount: 7,
};

const ArticlePage = () => {
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    // 실제 API 연동 전까지 mock 데이터로 대체
    setTimeout(() => {
      setArticle(mockArticle);
    }, 500); // 0.5초 딜레이로 로딩 느낌
  }, []);

  if (!article) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-10">
      <ArticleHeader
        title={article.title}
        author={article.userId}
        createdAt={article.createdAt}
        updatedAt={article.modifiedAt}
      />
      <ArticleContent markdown={article.content} />
      <LikeButton articleId={article.Id} likeCount={article.likeCount} />
      <CommentSection />
    </div>
  );
};

export default ArticlePage;
