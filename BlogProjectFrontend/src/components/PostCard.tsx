import React from 'react';

interface PostCardProps {
  title: string;
  subtitle: string;
}

const PostCard: React.FC<PostCardProps> = ({ title, subtitle }) => {
  return (
    <div className="flex gap-4 p-4 border rounded-lg hover:shadow-sm transition">
      <div className="w-16 h-16 bg-gray-200 rounded-md" />
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-gray-600">{subtitle}</p>
      </div>
    </div>
  );
};

export default PostCard;