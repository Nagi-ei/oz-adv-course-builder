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

export function SelectComponent({ categories }: { categories: string[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const handleChange = (value: string) => {
    setSelectedCategory(value);
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
