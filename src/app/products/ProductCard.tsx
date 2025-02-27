import Image from 'next/image';
import { Product } from '../types/products';
import { MessageSquareText, Star } from 'lucide-react';
import Link from 'next/link';

export default async function ProductCard({ product }: { product: Product }) {
  return (
    <li className='flex flex-col gap-2 border border-gray-200 rounded-md w-60 hover:bg-gray-100 transition-all duration-150'>
      <Link href={`/products/${product.id}`} className='p-4'>
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={200}
          height={200}
          draggable='false'
        />
        <div>
          <h3 className='text-md font-bold'>{product.title}</h3>
          <div className='flex gap-2 justify-between'>
            <div className='gap-2 flex'>
              <span className='text-sm text-gray-500 line-through'>
                ${' '}
                {(
                  (product.price * 100) /
                  (100 - product.discountPercentage)
                ).toFixed(2)}
              </span>
              <span className='text-sm text-red-500 font-bold'>
                - {product.discountPercentage}%
              </span>
            </div>
            <span className='text-sm font-bold'>$ {product.price}</span>
          </div>
          <div className='flex gap-2 justify-between'>
            <span className='text-xs text-gray-500'>
              <Star className='inline-block mr-1 w-3 h-3' />
              {product.rating}
            </span>
            <span className='text-xs text-gray-500'>
              <MessageSquareText className='inline-block mr-1 w-3 h-3' />
              {product.reviews.length}
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
}
