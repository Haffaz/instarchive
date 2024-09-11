import Image from 'next/image';
import Link from 'next/link';
import { XMarkIcon } from '@heroicons/react/24/solid';

type Props = {
  params: {
    encodedURI: string;
  };
};

export default function GeneratedPhotoPage({ params }: Props) {
  const imageUrl = decodeURIComponent(params.encodedURI);

  return (
    <div className='container max-h-screen mx-auto px-4 py-6 relative flex flex-col items-center'>
      <Link href='/' className='absolute top-4 right-4 z-10'>
        <XMarkIcon className='h-8 w-8 text-white hover:text-gray-300 transition-colors' />
      </Link>
      <div className='max-w-6xl mx-auto w-full flex flex-col md:flex-row'>
        <div className='flex-1 md:pr-8 mb-4 md:mb-0 relative'>
          <Image
            src={imageUrl}
            alt="Generated image"
            width={800}
            height={800}
            className='w-full h-auto max-h-[calc(100vh-48px)] object-contain rounded-lg'
          />
        </div>
        <div className='w-full md:w-1/3 flex flex-col justify-center md:mt-8'>
          <h2 className='text-2xl font-bold mb-4 text-white'>Generated Image</h2>
          <p className='text-gray-200 text-lg mb-4'>This image was generated based on the original photo.</p>
        </div>
      </div>
    </div>
  );
}
