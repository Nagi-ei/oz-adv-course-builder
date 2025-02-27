import { DummyResponse, Product } from '../types/products';
import ProductCard from './ProductCard';

export default async function Products({
  searchParams,
}: {
  searchParams: { query?: string };
}) {
  const query = searchParams?.query;
  let products: DummyResponse;

  if (query) {
    const searchedData = await fetch(
      `https://dummyjson.com/products/search?q=${query}`
    );
    products = await searchedData.json();
    console.log(products);
  } else {
    const productsData = await fetch('https://dummyjson.com/products');
    products = await productsData.json();
    console.log(products);
  }

  return (
    <ul className='flex flex-wrap gap-2 justify-center'>
      {products.products.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </ul>
  );
}
