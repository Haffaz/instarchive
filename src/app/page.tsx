import { getPostLink } from '@/utils/getPostLink';

export default function Home() {
  const handleSubmit = async (formData: FormData) => {
    'use server';

    const link = formData.get('instagramLink');
    if (!link) return;
    const postLink = await getPostLink(link.toString());

    console.log(postLink);
  };

  return (
    <main className=''>
      <div className='flex flex-col items-center justify-center min-h-screen bg-black-100'>
        <h1 className='text-3xl font-bold mb-6'>Instakive</h1>
        <form action={handleSubmit} className='w-full max-w-md'>
          <input
            type='text'
            name='instagramLink'
            placeholder='Enter Instagram image link'
            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black'
          />
          <button
            type='submit'
            className='mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300'
          >
            Add to collection
          </button>
        </form>
      </div>
    </main>
  );
}
