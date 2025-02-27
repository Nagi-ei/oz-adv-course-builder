import { Product } from '@/app/types/products';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';

export default function ProductInfo({ product }: { product: Product }) {
  return (
    <div className='w-full flex flex-col gap-4'>
      {/* 브랜드 */}
      <p className='text-xl font-bold border-b pb-2'>{product.brand}</p>

      {/* 가격 */}
      <div className='flex gap-4'>
        <span className='text-xl text-gray-500 line-through'>
          ${' '}
          {((product.price * 100) / (100 - product.discountPercentage)).toFixed(
            2
          )}
        </span>
        <span className='text-xl text-red-500 font-bold'>
          - {product.discountPercentage}%
        </span>
        <span className='text-xl font-bold flex-grow text-right'>
          $ {product.price}
        </span>
      </div>

      {/* 평점 */}
      <span className='text-lg'>
        <Star className='inline-block mr-1 w-4 h-4' />
        {product.rating}
      </span>

      {/* 태그 */}
      <ul className='flex gap-2'>
        {product.tags.map((tag) => (
          <li
            key={tag}
            className='text-gray-500 bg-gray-100 px-2 py-1 rounded-md'
          >
            {tag}
          </li>
        ))}
      </ul>

      {/* 환불 정책 */}
      <p className='text-gray-500 text-right'>{product.returnPolicy}</p>

      {/* 워런티 */}
      <p className='text-gray-500 text-right'>{product.warrantyInformation}</p>

      {/* 구매 버튼 */}
      <Button>Buy Now</Button>
    </div>
  );
}
