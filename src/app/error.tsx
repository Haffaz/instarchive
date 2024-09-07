'use client';

import { motion } from 'framer-motion';

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};
export default function Error({ error, reset }: ErrorProps) {
  console.error(error);

  return (
    <div className='min-h-screen bg-zinc-950 flex flex-col items-center justify-center px-4'>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='text-center'
      >
        <h1 className='text-3xl font-bold text-zinc-100 mb-4'>
          Oops! Something went wrong
        </h1>
        <p className='text-zinc-300 mb-8'>
          We are sorry, but an error occurred while processing your request.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => reset()}
          className='bg-zinc-700 text-zinc-100 py-2 px-4 rounded-lg transition duration-300 hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-500'
        >
          Try again
        </motion.button>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className='mt-8 text-zinc-400 text-sm'
      >
        Error details: {error.message}
      </motion.div>
    </div>
  );
}
