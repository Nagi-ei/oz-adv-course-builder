import Link from 'next/link';

type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

export default async function Favorites() {
  const postsApi = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await postsApi.json();

  // const commentsApi = await fetch();

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

  console.log(posts);

  return (
    <div className='p-4'>
      {/* <h1 className='text-2xl font-bold mb-4'>Favorites</h1>
      <p>Favorites management coming soon...</p> */}

      <h1 className='pt-4 text-xl font-bold'>Posts API</h1>
      <ul className='flex flex-col gap-4 p-4'>
        {posts.map((post: Post) => (
          <li
            key={post.id}
            className='border cursor-pointer hover:bg-gray-100 transition-all ease-in duration-150 border-gray-300 rounded-md'
          >
            <Link
              href={`/favorites/${post.id}`}
              className='flex gap-4 items-center justify-between p-4'
            >
              <span className='text-sm text-gray-500'>{post.id}</span>
              <h2 className='text-lg font-bold grow'>{post.title}</h2>
              <p className='text-sm text-gray-500 text-right min-w-8'>
                by {post.userId}
              </p>
              {/* <p>{post.body}</p> */}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
