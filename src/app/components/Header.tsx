'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

type Props = {
  handleOnLinkSubmit: (formData: FormData) => void;
};

const Header = ({ handleOnLinkSubmit }: Props) => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const toggleOverlay = () => {
    setIsOverlayOpen(!isOverlayOpen);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        className='fixed top-4 left-4 right-4 bg-black/50 backdrop-blur-md z-10 rounded-full'
      >
        <div className='container mx-auto px-6 py-3 flex items-center justify-between'>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className='text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'
          >
            Instakive
          </motion.h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleOverlay}
            className='md:hidden bg-gray-900 text-gray-300 p-2 rounded-full hover:bg-gray-800 transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 4v16m8-8H4'
              />
            </svg>
          </motion.button>
          <motion.form
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            action={handleOnLinkSubmit}
            className='hidden md:flex md:flex-grow md:max-w-2xl md:ml-8'
          >
            <div className='flex items-center w-full'>
              <input
                type='text'
                name='instagramLink'
                placeholder='Enter Instagram image link'
                className='flex-grow px-4 py-2 bg-black border border-gray-800 rounded-l-full focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-300'
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type='submit'
                className='bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-6 rounded-r-full hover:from-purple-600 hover:to-pink-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400'
              >
                Add
              </motion.button>
            </div>
          </motion.form>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOverlayOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 bg-black bg-opacity-90 z-20 flex items-center justify-center md:hidden'
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className='bg-black p-6 rounded-lg w-11/12 max-w-md shadow-xl border border-gray-800'
            >
              <form action={handleOnLinkSubmit}>
                <input
                  type='text'
                  name='instagramLink'
                  placeholder='Enter Instagram image link'
                  className='w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-300 mb-4'
                />
                <div className='flex justify-end space-x-3'>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type='button'
                    onClick={toggleOverlay}
                    className='px-5 py-2 border border-gray-800 rounded-full hover:bg-gray-900 transition duration-300 text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-700'
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type='submit'
                    className='bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-6 rounded-full hover:from-purple-600 hover:to-pink-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400'
                  >
                    Add
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
