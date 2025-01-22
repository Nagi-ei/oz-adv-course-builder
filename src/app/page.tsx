import Search from './search/page';

export default function Home() {
  console.log(process.env.NEXT_PUBLIC_NAVER_CLIENT_ID);
  return <Search />;
}
