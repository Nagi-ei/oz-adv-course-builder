import { Product } from '@/app/types/products';
import Image from 'next/image';

export default function ProductDetails({ product }: { product: Product }) {
  return (
    <div className='pt-4 pb-12 border-b'>
      {/* 설명 */}
      <p className='text-lg font-bold mb-2'>Description</p>
      <p className=''>{product.description}</p>

      {/* 이미지 */}
      <div className='flex gap-4 flex-col items-center'>
        {product.images.map((image) => (
          <Image
            key={image}
            src={image}
            alt={product.title}
            width={500}
            height={500}
          />
        ))}
      </div>
    </div>
  );
}
