import SearchBar from './SearchBar';
import PaginationComponent from './Pagenation';
import { SelectComponent } from './Select';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
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
      {children}
    </main>
  );
}
