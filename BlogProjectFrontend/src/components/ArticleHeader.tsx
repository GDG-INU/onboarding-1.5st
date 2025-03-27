import React from 'react';

interface Props {
  title: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

const formatDate = (isoString: string) => {
  return new Date(isoString).toLocaleString('ko-KR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
};

const ArticleHeader: React.FC<Props> = ({
  title,
  author,
  createdAt,
  updatedAt,
}) => {
  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-bold">{title}</h1>
      <div className="text-sm text-gray-600">
        작성자: {author} · 작성일: {formatDate(createdAt)}
        {createdAt !== updatedAt && <> · 수정일: {formatDate(updatedAt)}</>}
      </div>
    </div>
  );
};

export default ArticleHeader;
