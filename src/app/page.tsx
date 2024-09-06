import Header from '@/app/components/Header';
import { sql } from '@vercel/postgres';
import Image from 'next/image';

export default async function Home() {
  const { rows } = await sql`SELECT * FROM images ORDER BY created_at DESC`;

  return (
    <main className='min-h-screen bg-gray-100 pt-20'>
      <Header />
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {rows.map((image) => (
            <div
              key={image.id}
              className='bg-white rounded-lg shadow-md overflow-hidden'
            >
              <Image
                src={image.file_url}
                alt={image.caption}
                width={300}
                height={300}
                className='w-full h-64 object-cover'
              />
              <p className='p-4 text-sm text-gray-700'>{image.caption}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
