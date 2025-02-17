import { User } from 'lucide-react';
import React from 'react';

export default async function Page({ params }: { params: { id: string } }) {
  const post = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`
  );
  const postData = await post.json();

  const users = await fetch(`https://jsonplaceholder.typicode.com/users`);
  const usersData = await users.json();

  const user = usersData.find((user: any) => user.id === postData.userId); // any 제거하기

  const comments = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}/comments`
  );
  const commentsData = await comments.json();

  return (
    <main className='p-4 pb-20'>
      <h1 className='text-3xl font-bold border-b pb-4'>{postData.title}</h1>
      <div className='flex justify-between py-2'>
        <div className='flex items-center gap-2'>
          <User className='w-4 h-4' />
          {user.name}
        </div>
        <p className='text-sm text-gray-500'>
          {user.email} / {user.website}
        </p>
      </div>
      <p className='bg-gray-100 p-8 rounded-md text-xl'>{postData.body}</p>

      <h2 className='text-sm text-gray-500 border-b pb-2 mt-4'>Comments</h2>
      <ul className='flex flex-col gap-4'>
        {commentsData.map((comment: any) => (
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
