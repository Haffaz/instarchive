import Header from '@/app/components/Header';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { getPostData, uploadPhoto } from './actions';
import PhotoGrid, { Photo } from './components/PhotoGrid';

export default async function Home() {
  const { rows } = await sql`SELECT * FROM images ORDER BY created_at DESC`;

  const handleOnLinkSubmit = async (formData: FormData) => {
    'use server';
    const postLink = formData.get('instagramLink');
    if (!postLink) return;

    const { photoUrl, caption } = await getPostData(postLink.toString());
    const blobUrl = await uploadPhoto(photoUrl);
    await sql`INSERT INTO images (post_url, file_url, caption) VALUES (${postLink.toString()}, ${blobUrl}, ${caption})`;
    revalidatePath('/');
  };

  return (
    <main className='min-h-screen bg-zinc-950 pt-20'>
      <Header handleOnLinkSubmit={handleOnLinkSubmit} />
      <div className='container mx-auto px-4 py-4'>
        <PhotoGrid images={rows as Photo[]} />
      </div>
    </main>
  );
}
