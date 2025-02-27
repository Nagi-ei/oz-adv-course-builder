import React from 'react';
import { Product } from '@/app/types/products';
import ProductCard from '../ProductCard';

export default async function Page({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  const productsByCategoryData = await fetch(
    `https://dummyjson.com/products/category/${category}`
  );
  const productsByCategory = await productsByCategoryData.json();

  return (
    <ul className='flex flex-wrap gap-2 justify-center'>
      {productsByCategory.products.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </ul>
  );
}
