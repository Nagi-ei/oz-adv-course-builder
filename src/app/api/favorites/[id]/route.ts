import { User } from '@/context/PostApiContext';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const URL = 'https://jsonplaceholder.typicode.com';
  const POSTS_ENDPOINT = `${URL}/posts`;
  const USERS_ENDPOINT = `${URL}/users`;
  const COMMENTS_ENDPOINT = `${URL}/posts/${id}/comments`;

  try {
    const [post, users, comments] = await Promise.all([
      fetch(`${POSTS_ENDPOINT}/${id}`).then((res) => res.json()),
      fetch(`${USERS_ENDPOINT}`).then((res) => res.json()),
      fetch(`${COMMENTS_ENDPOINT}`).then((res) => res.json()),
    ]);

    if (!post || !users || !comments) {
      throw new Error('Failed to fetch data');
    }

    const user = users.find((user: User) => user.id === post.userId);

    return NextResponse.json({ post, user, comments }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}
