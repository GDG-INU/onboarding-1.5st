import React from 'react';
import PostCard from './PostCard';

const dummyPosts = [
  {
    title: 'The Power of Positive Thinking',
    subtitle: 'Learn how positivity can change your life.',
  },
  {
    title: 'Traveling on a Budget',
    subtitle: 'Explore the world without breaking the bank.',
  },
];

const PostList = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {Array.from({ length: 3 }).flatMap(() =>
        dummyPosts.map((post, i) => (
          <PostCard key={`${post.title}-${i}`} {...post} />
        ))
      )}
    </div>
  );
};

export default PostList;
