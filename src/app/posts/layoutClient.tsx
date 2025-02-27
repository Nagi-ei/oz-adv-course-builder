import { PostApiContextProvider } from '@/context/PostApiContext';

export default function FavoritesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PostApiContextProvider>{children}</PostApiContextProvider>;
}
