import { Photo } from '@/app/components/PhotoGrid';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid';
import { del } from '@vercel/blob';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { QueryResult } from 'pg';
import { generateImage } from './actions';
import DeleteButton from './components/DeleteButton';
import GenerateButton from './components/GenerateButton';

type Props = {
  params: {
    photoId: string;
  };
};

export default async function PhotoPage({ params }: Props) {
  const { rows } = (await sql`
    SELECT * FROM images WHERE id = ${params.photoId}
  `) as QueryResult<Photo>;

  if (rows.length === 0) {
    return <div>Photo not found</div>;
  }

  const photo = rows[0];

  // Fetch previous and next photo IDs
  const { rows: prevRows } = (await sql`
    SELECT id FROM images 
    WHERE created_at >= ${photo.created_at} AND id != ${photo.id} 
    ORDER BY created_at LIMIT 1
  `) as QueryResult<{ id: string }>;

  const { rows: nextRows } = (await sql`
    SELECT id FROM images 
    WHERE created_at <= ${photo.created_at} 
    ORDER BY created_at DESC LIMIT 1
  `) as QueryResult<{ id: string }>;

  const prevPhotoId = prevRows[0]?.id;
  const nextPhotoId = nextRows[0]?.id;

  const deletePhotoAction = async () => {
    'use server';
    await sql`DELETE FROM images WHERE id = ${params.photoId}`;
    await del(photo.file_url);
    revalidatePath('/');
    redirect('/');
  };

  const generateImageAction = async () => {
    'use server';
    const { url } = await generateImage(
      photo.file_url,
      'Transform the original image into a 3D cartoon style while preserving all essential physical features and the composition. Maintain the original shapes, proportions, and spatial relationships between objects. Convert the texture to a cartoon style with bold, clean lines, simplified details, and vibrant colors. The result should resemble a 3D animated scene with exaggerated but smooth features, soft lighting, and expressive elements. Ensure that no physical aspects (such as size, layout, or structure) are changed, only the texture and overall style are modified to a cartoon aesthetic.',
    );
    const encodedUrl = encodeURIComponent(url);

    redirect(`/p/generated/${encodedUrl}`);
  };

  return (
    <div className='container max-h-screen mx-auto px-4 py-6 relative flex flex-col items-center'>
      <Link href='/' className='absolute top-4 right-4 z-10'>
        <XMarkIcon className='h-8 w-8 text-white hover:text-gray-300 transition-colors' />
      </Link>
      <div className='max-w-6xl mx-auto w-full flex flex-col md:flex-row'>
        <div className='flex-1 md:pr-8 mb-4 md:mb-0 relative'>
          <Image
            src={photo.file_url}
            alt={photo.caption}
            width={800}
            height={800}
            className='w-full h-auto max-h-[calc(100vh-48px)] object-contain rounded-lg'
          />
          {prevPhotoId && (
            <Link
              href={`/p/${prevPhotoId}`}
              className='absolute left-4 top-1/2 transform -translate-y-1/2 md:fixed md:left-4'
            >
              <ChevronLeftIcon className='h-12 w-12 text-white hover:text-gray-300 transition-colors' />
            </Link>
          )}
          {nextPhotoId && (
            <Link
              href={`/p/${nextPhotoId}`}
              className='absolute right-4 top-1/2 transform -translate-y-1/2 md:fixed md:right-4'
            >
              <ChevronRightIcon className='h-12 w-12 text-white hover:text-gray-300 transition-colors' />
            </Link>
          )}
        </div>
        <div className='w-full md:w-1/3 flex flex-col justify-center md:mt-8'>
          <p className='text-gray-200 text-lg mb-4'>{photo.caption}</p>
          <div className='flex flex-1 justify-between space-x-4 mb-4'>
            <form action={generateImageAction} className='flex-1'>
              <GenerateButton />
            </form>
            <form action={deletePhotoAction}>
              <DeleteButton />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
