export const fetchPosts = async () => {
  // 병렬로 요청을 보내서 성능 개선
  const [postsResponse, usersResponse] = await Promise.all([
    fetch('https://jsonplaceholder.typicode.com/posts'),
    fetch('https://jsonplaceholder.typicode.com/users'),
  ]);

  // 에러 처리
  if (!postsResponse.ok || !usersResponse.ok) {
    throw new Error('Failed to fetch data');
  }

  const [posts, users] = await Promise.all([
    postsResponse.json(),
    usersResponse.json(),
  ]);

  return { posts, users };
  // } catch (error) {
  //   console.error('Error fetching data:', error);
  //   // 에러 상태 관리 필요
  // }
};
