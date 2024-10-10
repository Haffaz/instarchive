'use client';
import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className='min-h-screen bg-zinc-950 flex items-center justify-center'>
      <motion.div
        className='text-zinc-300 text-2xl font-bold'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
      >
        Loading...
      </motion.div>
      <motion.div
        className='absolute bottom-10 left-1/2 transform -translate-x-1/2'
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
      >
        <div className='w-16 h-16 border-t-4 border-zinc-300 border-solid rounded-full animate-spin'></div>
      </motion.div>
    </div>
  );
}
