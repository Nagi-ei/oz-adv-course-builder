import { User as UserIcon } from 'lucide-react';
import { Comment } from '@/app/types/posts';

// Dynamic Route
export default async function Post({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const posts = await fetch(`http://localhost:3000/api/posts/${id}`);
  const { post, user, comments } = await posts.json();

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
