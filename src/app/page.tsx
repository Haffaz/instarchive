import Header from '@/app/components/Header';
import PhotoGrid from './components/PhotoGrid';

export default async function Home({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = Number(searchParams.page) || 1;

  return (
    <main className='min-h-screen bg-zinc-950 pt-20'>
      <Header />
      <div className='container mx-auto px-4 py-4'>
        <PhotoGrid page={page} />
      </div>
    </main>
  );
}
