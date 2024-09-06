import { sql } from '@vercel/postgres';
import Image from 'next/image';
import Link from 'next/link';

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

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='max-w-3xl mx-auto'>
        <Image
          src={photo.file_url}
          alt={photo.caption}
          width={800}
          height={800}
          className='w-full h-auto object-contain mb-4'
        />
        <p className='text-gray-200 text-lg mb-4'>{photo.caption}</p>
        <Link
          href='/'
          className='inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-6 rounded-full hover:from-purple-600 hover:to-pink-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400'
        >
          Back to Gallery
        </Link>
      </div>
    </div>
  );
}
