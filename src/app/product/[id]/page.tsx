import { Product } from '@/app/types/products';
import Image from 'next/image';
import ProductInfo from './ProductInfo';
import ProductDetails from './ProductDetails';
import Reviews from './Reviews';

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const productApi = await fetch(`https://dummyjson.com/products/${id}`);
  const product: Product = await productApi.json();

  console.log(product);

  return (
    <main className='p-4 pb-20'>
      <h1 className='text-3xl font-bold mb-4 border-b pb-4'>{product.title}</h1>

      <div className='flex gap-4 sm:flex-row flex-col justify-center items-center pt-4 pb-12 border-b'>
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={350}
          height={350}
          draggable='false'
        />
        <ProductInfo product={product} />
      </div>

      <ProductDetails product={product} />

      <Reviews reviews={product.reviews} />
    </main>
  );
}
