import { Product } from '../types/products';
import ProductCard from './ProductCard';
import SearchBar from './SearchBar';
import PaginationComponent from './Pagenation';
import { SelectComponent } from './Select';

export default async function Products() {
  const productsData = await fetch('https://dummyjson.com/products');
  const products = await productsData.json();
  console.log(products);

  const categoriesData = await fetch(
    'https://dummyjson.com/products/category-list'
  );
  const categories = await categoriesData.json();
  console.log(categories);

  return (
    <main className='flex flex-col gap-4 p-4 pb-20'>
      <h1 className='p-4 text-xl font-bold'>Dummy JSON - Products</h1>

      <SearchBar />

      <SelectComponent categories={categories} />

      <ul className='flex flex-wrap gap-2 justify-center'>
        {products.products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ul>

      <PaginationComponent />
    </main>
  );
}
