import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
  TrashIcon,
} from '@heroicons/react/24/solid';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

type Props = {
  params: {
    photoId: string;
  };
};

export default async function PhotoPage({ params }: Props) {
  const { rows } = await sql`SELECT * FROM images WHERE id = ${params.photoId}`;

  if (rows.length === 0) {
    return <div>Photo not found</div>;
  }

  const photo = rows[0];

  // Fetch previous and next photo IDs
  const { rows: prevRows } =
    await sql`SELECT id FROM images WHERE id < ${params.photoId} ORDER BY id DESC LIMIT 1`;
  const { rows: nextRows } =
    await sql`SELECT id FROM images WHERE id > ${params.photoId} ORDER BY id ASC LIMIT 1`;

  const prevPhotoId = prevRows[0]?.id;
  const nextPhotoId = nextRows[0]?.id;

  const handleDelete = async () => {
    'use server';
    await sql`DELETE FROM images WHERE id = ${params.photoId}`;
    revalidatePath("/")
    redirect("/");
  };

  return (
    <div className='container mx-auto px-4 py-8 relative min-h-screen'>
      <Link href='/' className='absolute top-4 right-4 z-10'>
        <XMarkIcon className='h-8 w-8 text-white hover:text-gray-300 transition-colors' />
      </Link>
      <div className='max-w-3xl mx-auto'>
        <Image
          src={photo.file_url}
          alt={photo.caption}
          width={800}
          height={800}
          className='w-full h-auto object-contain mb-4 rounded-lg'
        />
        <p className='text-gray-200 text-lg mb-4'>{photo.caption}</p>
        <form action={handleDelete}>
          <button
            type='submit'
            className='bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center'
          >
            <TrashIcon className='h-5 w-5 mr-2' />
            Delete Photo
          </button>
        </form>
      </div>
      {prevPhotoId && (
        <Link
          href={`/p/${prevPhotoId}`}
          className='fixed left-4 top-1/2 transform -translate-y-1/2'
        >
          <ChevronLeftIcon className='h-12 w-12 text-white hover:text-gray-300 transition-colors' />
        </Link>
      )}
      {nextPhotoId && (
        <Link
          href={`/p/${nextPhotoId}`}
          className='fixed right-4 top-1/2 transform -translate-y-1/2'
        >
          <ChevronRightIcon className='h-12 w-12 text-white hover:text-gray-300 transition-colors' />
        </Link>
      )}
    </div>
  );
}
