'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React from 'react';

export default function SearchBar() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e.currentTarget.search.value);
    // 검색어를 쿼리 파라미터로해서 (정규표현식을 거쳐서) 네비게이트?
  };

  // 디바운스니 이런건 나중에...

  return (
    <form onSubmit={handleSubmit} className='flex gap-2'>
      <Input type='text' name='search' placeholder='Search' />
      <Button type='submit'>Search</Button>
    </form>
  );
}
