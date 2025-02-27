'use client';

import Link from 'next/link';
import { Post, User } from '@/app/types/posts';

export default function PostCard({
  post,
  user,
}: {
  post: Post;
  user: User | undefined;
}) {
  return (
    <li
      key={post.id}
      className='border cursor-pointer hover:bg-gray-100 transition-all ease-in duration-150 border-gray-300 rounded-md'
    >
      <Link
        href={`/posts/${post.id}`}
        className='flex gap-4 items-center justify-between p-4'
      >
        <span className='text-sm text-gray-500'>{post.id}</span>
        <h2 className='text-lg font-bold grow'>{post.title}</h2>
        <p className='text-sm text-gray-500 text-right min-w-8'>
          by {user ? user.name : 'Unknown'}
        </p>
      </Link>
    </li>
  );
}
