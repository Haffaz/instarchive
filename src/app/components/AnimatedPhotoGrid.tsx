'use client';

import { Photo } from '@/app/components/PhotoGrid';
import { Variants, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const container: Variants = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const item: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export default function AnimatedPhotoGrid({ images }: { images: Photo[] }) {
  return (
    <motion.div
      className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'
      initial='hidden'
      animate='visible'
      variants={container}
    >
      {images.map((image) => (
        <motion.div
          key={image.id}
          className='item bg-zinc-900 rounded-lg overflow-hidden'
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 150, damping: 20 }}
          variants={item}
        >
          <Link
            href={`/p/${image.id}`}
            className='overflow-hidden relative group'
          >
            <Image
              src={image.file_url}
              alt={image.caption}
              width={300}
              height={300}
              className='w-full h-full object-cover'
            />
            <motion.div
              className='absolute inset-0 bg-zinc-900 bg-opacity-90 flex items-center justify-center'
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <p className='text-zinc-300 text-sm p-4 text-center'>
                {image.caption}
              </p>
            </motion.div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
