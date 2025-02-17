'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Map, Compass, Heart, User, File } from 'lucide-react';

const navItems = [
  { name: 'Search', href: '/', icon: Search },
  { name: 'Map', href: '/map', icon: Map },
  { name: 'Course', href: '/course', icon: Compass },
  { name: 'Favorites', href: '/favorites', icon: Heart },
  { name: 'Memo', href: '/memo', icon: File },
  { name: 'Profile', href: '/profile', icon: User },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className='fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50'>
      <ul className='flex justify-around items-center h-16'>
        {navItems.map((item) => (
          <li key={item.name}>
            <Link
              href={item.href}
              className={`flex flex-col items-center justify-center w-full h-full px-3 py-2 text-sm ${
                pathname === item.href ||
                (item.href === '/' && pathname === '/search')
                  ? 'text-primary'
                  : 'text-muted-foreground'
              }`}
            >
              <item.icon className='w-6 h-6 mb-1' />
              <span>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
