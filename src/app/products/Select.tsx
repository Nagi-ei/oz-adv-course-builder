'use client';

import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRouter } from 'next/navigation';

export function SelectComponent({ categories }: { categories: string[] }) {
  // const [selectedCategory, setSelectedCategory] = useState<string>('');
  const router = useRouter();

  const handleChange = (value: string) => {
    console.log(value);
    router.push(`/products/${value}`);
  };

  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className='w-[250px]'>
        <SelectValue placeholder='Select a Category' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Categories</SelectLabel>
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
