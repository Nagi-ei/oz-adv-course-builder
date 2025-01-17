'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SearchIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import PlaceholderImage from '@/components/ui/placeholder-image';
import { places } from '@/data/places';

interface SearchResult {
  id: number;
  name: string;
  type: string;
  image: string;
}

export default function Search() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(places);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement actual search logic here
    console.log('Searching for:', searchQuery);
  };

  const handlePlaceClick = (placeId: string) => {
    router.push(`/places/${placeId}`);
  };

  return (
    <div className='flex flex-col h-[calc(100vh-4rem)]'>
      <div className='p-4 bg-background sticky top-0 z-10'>
        <form onSubmit={handleSearch} className='flex gap-2'>
          <Input
            type='text'
            placeholder='Search locations...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='flex-grow'
          />
          <Button type='submit' size='icon'>
            <SearchIcon className='h-4 w-4' />
          </Button>
        </form>
      </div>
      <div className='flex-grow overflow-auto p-4'>
        {searchResults.map((result) => (
          <Link href={`/places/${result.id}`} key={result.id} prefetch={false}>
            <Card className='mb-4 hover:bg-accent transition-colors'>
              <CardContent className='p-4 flex items-center'>
                {result.image ? (
                  <Image
                    src={result.image}
                    alt={result.name}
                    width={64}
                    height={64}
                    className='object-cover rounded-md mr-4'
                    unoptimized
                  />
                ) : (
                  <PlaceholderImage />
                )}
                <div>
                  <h2 className='text-lg font-semibold'>{result.name}</h2>
                  <p className='text-sm text-muted-foreground'>{result.type}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
