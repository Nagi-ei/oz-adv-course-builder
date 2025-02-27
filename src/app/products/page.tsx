import { DummyResponse, Product } from '../types/products';
import PaginationComponent from './Pagenation';
import ProductCard from './ProductCard';

export default async function Products({
  searchParams,
}: {
  searchParams: { query?: string; page?: string };
}) {
  const query = searchParams?.query;
  const page = parseInt(searchParams?.page || '1');
  let products: DummyResponse;

  if (query) {
    const searchedData = await fetch(
      `https://dummyjson.com/products/search?q=${query}&limit=30&skip=${(page - 1) * 30}`
    );
    products = await searchedData.json();
    console.log(products);
  } else {
    const productsData = await fetch(
      `https://dummyjson.com/products?limit=30&skip=${(page - 1) * 30}`
    );
    products = await productsData.json();
    console.log(products);
  }

  return (
    <>
      <ul className='flex flex-wrap gap-2 justify-center'>
        {products.products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ul>
      <PaginationComponent page={page} total={products.total} />
    </>
  );
}
