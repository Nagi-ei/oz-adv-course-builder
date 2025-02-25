'use client';

import React, { useEffect, useState } from 'react';
import { User as UserIcon } from 'lucide-react';
import { usePostApi } from '@/context/PostApiContext';
import { useParams } from 'next/navigation';

type Comment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

type Comments = Comment[];

// Dynamic Route
export default function Page() {
  const { id } = useParams<{ id: string }>();
  const { posts, users } = usePostApi();
  const [comments, setComments] = useState<Comments>([]);

  const post = posts.find((post) => post.id === parseInt(id));
  const user = users.find((user) => user.id === post?.userId);

  useEffect(() => {
    const fetchComments = async () => {
      const allComments = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}/comments`
      );
      const comments = await allComments.json();
      setComments(comments);
    };
    fetchComments();
  }, [id]);

  if (!post || !user || !comments) {
    return <div>Loading...</div>;
  }

  return (
    <main className='p-4 pb-20'>
      <h1 className='text-3xl font-bold border-b pb-4'>{post.title}</h1>
      <div className='flex justify-between py-2'>
        <div className='flex items-center gap-2'>
          <UserIcon className='w-4 h-4' />
          {user.name}
        </div>
        <p className='text-sm text-gray-500'>
          {user.email} / {user.website}
        </p>
      </div>
      <p className='bg-gray-100 p-8 rounded-md text-xl'>{post.body}</p>

      <h2 className='text-sm text-gray-500 border-b pb-2 mt-4'>Comments</h2>
      <ul className='flex flex-col gap-4'>
        {comments.map((comment: Comment) => (
          <li key={comment.id} className='border-b py-4 flex flex-col gap-2'>
            <p className='font-bold'>
              <span className='text-gray-500'>{comment.id}. </span>
              {comment.name}
            </p>
            <p className='text-sm text-right text-gray-500'>{comment.email}</p>
            <p>{comment.body}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
