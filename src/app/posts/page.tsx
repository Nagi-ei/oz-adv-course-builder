import PostCard from './PostCard';
import { Post, User } from '@/app/types/posts';

export default async function Posts() {
  const postsApi = await fetch(`http://localhost:3000/api/posts`);
  const { users, posts } = await postsApi.json(); // users, posts 타입 체크는 어떻게?

  // PUT 해도 데이터는 안바뀜
  // const testPost = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
  //   method: 'PUT',
  //   headers: {
  //     'Content-Type': 'application/json; charset=UTF-8',
  //   },
  //   body: JSON.stringify({
  //     id: 1,
  //     title: '목업',
  //     body: 'ㅁㄴㅇㄹ',
  //     userId: 1,
  //   }),
  // })
  //   .then((res) => res.json())
  //   .then((json) => console.log(json));

  if (!posts || !users) {
    return <div>Something went wrong. Please refresh the page. 🥲</div>;
  }

  return (
    <main className='p-4 pb-20'>
      <h1 className='pt-4 text-xl font-bold'>Posts API</h1>
      <ul className='flex flex-col gap-4 p-4'>
        {posts.map((post: Post) => (
          <PostCard
            key={post.id}
            post={post}
            user={users.find((user: User) => user.id === post.userId)}
          />
        ))}
      </ul>
    </main>
  );
}
