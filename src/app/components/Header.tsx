import { getPostData, uploadPhoto } from '@/app/actions';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';

export default function Header() {
  const handleSubmit = async (formData: FormData) => {
    'use server';
    const postLink = formData.get('instagramLink');
    if (!postLink) return;

    const { photoUrl, caption } = await getPostData(postLink.toString());
    const blobUrl = await uploadPhoto(photoUrl);
    await sql`INSERT INTO images (file_url, caption) VALUES (${blobUrl}, ${caption})`;
    revalidatePath('/');
  };

  return (
    <nav className='fixed top-0 left-0 right-0 bg-white shadow-md z-10'>
      <div className='container mx-auto px-4 py-3 flex items-center justify-between'>
        <h1 className='text-2xl font-bold text-blue-500'>Instakive</h1>
        <form action={handleSubmit} className='flex-grow max-w-2xl ml-8'>
          <div className='flex items-center'>
            <input
              type='text'
              name='instagramLink'
              placeholder='Enter Instagram image link'
              className='flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black'
            />
            <button
              type='submit'
              className='bg-blue-500 text-white py-2 px-6 rounded-r-md hover:bg-blue-600 transition duration-300'
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </nav>
  );
}
