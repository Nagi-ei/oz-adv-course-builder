import React from 'react';
import { Product } from '@/app/types/products';
import ProductCard from '../ProductCard';
import PaginationComponent from '../Pagenation';

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page: string }>;
}) {
  const { category } = await params;
  const { page } = await searchParams;

  const productsByCategoryData = await fetch(
    `https://dummyjson.com/products/category/${category}`
  );
  const productsByCategory = await productsByCategoryData.json();
  console.log(productsByCategory);

  return (
    <>
      <ul className='flex flex-wrap gap-2 justify-center'>
        {productsByCategory.products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ul>
      <PaginationComponent
        page={parseInt(page)}
        total={productsByCategory.total}
      />
    </>
  );
}
