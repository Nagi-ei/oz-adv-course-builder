import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function Page() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log(user);

  if (!user) {
    redirect('/sign-in');
  }

  const { data: memo } = await supabase.from('memo').select('*');

  console.log(memo);

  return (
    <div>
      <h1 className='text-2xl font-bold'>Memo</h1>
      <p>Memo content</p>
      <pre>{JSON.stringify(memo, null, 2)}</pre>
    </div>
  );
}
