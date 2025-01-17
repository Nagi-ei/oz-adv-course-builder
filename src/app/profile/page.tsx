'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function Profile() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (!session) {
          router.push('/sign-in');
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();
  }, [router]);

  if (isLoading) {
    return <div className='p-4'>Loading...</div>;
  }

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold'>Profile</h1>
      {/* Profile content here */}
    </div>
  );
}
