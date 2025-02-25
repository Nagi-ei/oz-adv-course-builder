'use client';

import { fetchPosts } from '@/lib/fetch';
import { createContext, useContext, useEffect, useState } from 'react';

export type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

export type Posts = Post[];

export type Users = User[];

type PostApiContextProps = {
  posts: Posts;
  users: Users;
};

// const fetchPosts = async () => {
//   // 병렬로 요청을 보내서 성능 개선
//   const [postsResponse, usersResponse] = await Promise.all([
//     fetch('https://jsonplaceholder.typicode.com/posts'),
//     fetch('https://jsonplaceholder.typicode.com/users'),
//   ]);

//   // 에러 처리
//   if (!postsResponse.ok || !usersResponse.ok) {
//     throw new Error('Failed to fetch data');
//   }

//   const [posts, users] = await Promise.all([
//     postsResponse.json(),
//     usersResponse.json(),
//   ]);

//   return { posts, users };
//   // } catch (error) {
//   //   console.error('Error fetching data:', error);
//   //   // 에러 상태 관리 필요
//   // }
// };

const PostApiContext = createContext<PostApiContextProps | null>(null);

export function PostApiContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [posts, setPosts] = useState<Posts>([]);
  const [users, setUsers] = useState<Users>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchPosts();
      console.log(res);
      setPosts(res.posts);
      setUsers(res.users);
    };

    fetchData();

    // cleanup 함수 추가
    return () => {
      setPosts([]);
      setUsers([]);
    };
  }, []);

  // const commentsApi = await fetch(
  //   `https://jsonplaceholder.typicode.com/comments`
  // );
  // const comments = await commentsApi.json();

  return (
    <PostApiContext.Provider
      value={{
        posts,
        users,
      }}
    >
      {children}
    </PostApiContext.Provider>
  );
}

export function usePostApi() {
  const context = useContext(PostApiContext);
  if (!context) {
    throw new Error('usePostApi must be used within a PostApiContextProvider');
  }
  return context;
}
