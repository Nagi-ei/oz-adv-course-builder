'use client';

import PostCard from './PostCard';
import { usePostApi } from '@/context/PostApiContext';
import { Post } from '@/app/types/posts';
export default function Posts() {
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
