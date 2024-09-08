'use client';
import SparklesIcon from '@heroicons/react/24/solid/SparklesIcon';
import { motion } from 'framer-motion';
import { useFormStatus } from 'react-dom';

export default function GenerateButton() {
  const { pending } = useFormStatus();
  return (
    <motion.button
      whileHover={{ scale: pending ? 1 : 1.05 }}
      whileTap={{ scale: pending ? 1 : 0.95 }}
      type='submit'
      disabled={pending}
      className={`bg-zinc-800 text-zinc-200 font-medium py-3 px-4 rounded-lg flex items-center justify-center w-full transition duration-300 focus:outline-none focus:ring-2 focus:ring-zinc-500 shadow-md ${
        pending ? 'opacity-50 cursor-not-allowed' : 'hover:bg-zinc-700'
      }`}
    >
      {pending ? (
        <motion.div
          className='inline-block h-5 w-5 mr-2 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      ) : (
        <SparklesIcon className='h-5 w-5 mr-2 group-hover:text-blue-400 transition-colors' />
      )}
      <span>{pending ? 'Generating...' : 'Generate'}</span>
    </motion.button>
  );
}
