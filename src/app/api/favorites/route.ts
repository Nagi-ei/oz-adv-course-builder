import { NextResponse } from 'next/server';

export async function GET() {
  const URL = 'https://jsonplaceholder.typicode.com';
  const USERS_ENDPOINT = `${URL}/users`;
  const POSTS_ENDPOINT = `${URL}/posts`;

  try {
    const [users, posts] = await Promise.all([
      fetch(USERS_ENDPOINT).then((res) => res.json()),
      fetch(POSTS_ENDPOINT).then((res) => res.json()),
    ]);

    if (!users || !posts) {
      throw new Error('Failed to fetch data');
    }

    return NextResponse.json({ users, posts }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}
