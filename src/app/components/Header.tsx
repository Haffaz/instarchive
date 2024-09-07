'use client';
import { handleAddPhotoAction } from '@/app/actions';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';

const initialState = { message: '' };

const Header = () => {
  const [state, formAction] = useFormState(handleAddPhotoAction, initialState);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (state?.message) {
      setShowAlert(true);
      const timer = setTimeout(() => setShowAlert(false), 5000); // Auto-hide after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [state?.message]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 150, damping: 20 }}
        className='fixed top-0 left-0 right-0 z-10'
      >
        <div className='container mx-auto px-4 py-2 mt-4'>
          <div className='bg-zinc-900 bg-opacity-70 backdrop-filter backdrop-blur-lg rounded-xl shadow-lg'>
            <div className='px-4 py-2 flex items-center justify-between'>
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className='text-xl font-bold text-zinc-100'
              >
                Instakive
              </motion.h1>
              <motion.form
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                action={formAction}
                className='flex-grow max-w-sm ml-4'
              >
                <div className='flex items-center w-full bg-zinc-800 bg-opacity-50 rounded-lg overflow-hidden shadow-inner'>
                  <input
                    type='text'
                    name='instagramLink'
                    placeholder='ex: https://www.instagram.com/p/aBcd123xLSl'
                    className='w-full px-4 py-2 bg-transparent focus:outline-none text-zinc-200 placeholder-zinc-400 text-sm'
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type='submit'
                    className='bg-zinc-700 bg-opacity-70 text-zinc-100 py-2 px-4 text-sm rounded-r-lg hover:bg-zinc-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-zinc-500 shadow-md'
                  >
                    Add
                  </motion.button>
                </div>
              </motion.form>
            </div>
          </div>
        </div>
      </motion.nav>
      <AnimatePresence>
        {showAlert && state?.message && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '100%' }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 50, x: '100%' }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className='fixed bottom-4 right-4 z-50 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center'
          >
            <span>Oops! something went wrong... {state.message}</span>
            <button
              onClick={() => setShowAlert(false)}
              className='ml-2 focus:outline-none'
            >
              <XMarkIcon className='h-5 w-5 text-white hover:text-gray-200 transition-colors' />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <div className='h-4'></div>
      {/* Increased spacer for the floating header */}
    </>
  );
};

export default Header;
