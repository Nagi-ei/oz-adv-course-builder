// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { supabase } from '@/lib/supabaseClient';
// import { Button } from '@/components/ui/button';
// import { Image } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { createClient } from '@/utils/supabase/server';
import Image from 'next/image';
import Link from 'next/link';
import { signOutAction } from '../(auth-pages)/sign-out/action';

export default async function Profile() {
  // const router = useRouter();
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const checkUser = async () => {
  //     try {
  //       const {
  //         data: { session },
  //       } = await supabase.auth.getSession();
  //       if (!session) {
  //         router.push('/sign-in');
  //       }
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   checkUser();
  // }, [router]);

  // if (isLoading) {
  //   return <div className='p-4'>Loading...</div>;
  // }

  // return (
  //   <div className='p-4'>
  //     <h1 className='text-2xl font-bold'>Profile</h1>
  //     <Button onClick={() => supabase.auth.signOut()}>Sign Out</Button>
  //     {/* Profile content here */}
  //   </div>
  // );

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <>
        <div>
          <h1 className='text-2xl font-bold'>프로필</h1>
          <p className='mt-2'>로그인이 필요합니다.</p>
          <div>
            <Button variant={'outline'} asChild>
              <Link href='/sign-in'>로그인</Link>
            </Button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className='container mx-auto p-4'>
        <h1 className='text-2xl font-bold'>프로필</h1>
        <p className='mt-2'>{user.email}님, 환영합니다.</p>
        <Image
          src='/profile-pic.jpg'
          alt='Profile Picture'
          width={150}
          height={150}
          className='rounded-full mt-4'
        />
        <form action={signOutAction}>
          <Button type='submit' variant={'outline'}>
            로그아웃
          </Button>
        </form>
      </div>
    </>
  );
}
