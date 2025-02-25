'use client';

import PostCard from './PostCard';
import { Post, usePostApi, User } from '@/context/PostApiContext';

export default function Favorites() {
  const { posts, users } = usePostApi();
  console.log(posts, users);

  if (!posts || !users) {
    return <div>Loading...</div>;
  }

  return (
    <div className='p-4'>
      <h1 className='pt-4 text-xl font-bold'>Posts API</h1>
      <ul className='flex flex-col gap-4 p-4'>
        {posts.map((post: Post) => (
          <PostCard
            key={post.id}
            post={post}
            user={users.find((user) => user.id === post.userId)}
          />
        ))}
      </ul>
    </div>
  );
}
