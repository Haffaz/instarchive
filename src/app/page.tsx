import Header from '@/app/components/Header';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import Image from 'next/image';
import Link from 'next/link';
import { getPostData, uploadPhoto } from './actions';

export default async function Home() {
  const { rows } = await sql`SELECT * FROM images ORDER BY created_at DESC`;

  const handleOnLinkSubmit = async (formData: FormData) => {
    'use server';
    const postLink = formData.get('instagramLink');
    if (!postLink) return;

    const { photoUrl, caption } = await getPostData(postLink.toString());
    const blobUrl = await uploadPhoto(photoUrl);
    await sql`INSERT INTO images (file_url, caption) VALUES (${blobUrl}, ${caption})`;
    revalidatePath('/');
  };

  return (
    <main className='min-h-screen bg-gray-900 pt-20'>
      <Header handleOnLinkSubmit={handleOnLinkSubmit} />
      <div className='container mx-auto px-4 py-8'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
          {rows.map((image) => (
            <Link
              href={`/p/${image.id}`}
              key={image.id}
              className='bg-gray-800 rounded-xs overflow-hidden relative group'
            >
              <Image
                src={image.file_url}
                alt={image.caption}
                width={300}
                height={300}
                className='w-full h-full object-cover'
              />
              <div className='absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                <p className='text-gray-200 text-sm p-4 text-center'>
                  {image.caption}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
