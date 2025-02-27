'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function SearchBar() {
  // const [query, setQuery] = useState<string>('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = e.currentTarget.search.value;
    if (!query) {
      router.push('/products');
      return;
    }
    // 정규표현식도 나중에
    router.push(`/products?query=${query}`);
  };

  // 디바운스니 이런건 나중에...

  // 이렇게 아무것도 구현 안해놓으면 굳이 클라이언트 컴포넌트일 필요가 없는듯

  return (
    <form onSubmit={handleSubmit} className='flex gap-2'>
      <Input type='text' name='search' placeholder='Search' />
      <Button type='submit'>Search</Button>
    </form>
  );
}
