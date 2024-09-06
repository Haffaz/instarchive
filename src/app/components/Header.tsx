'use client';
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
            <nav className='fixed top-4 left-4 right-4 bg-white/30 backdrop-blur-md z-10 rounded-full'>
                <div className='container mx-auto px-6 py-3 flex items-center justify-between'>
                    <h1 className='text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'>
                        Instakive
                    </h1>
                    <button
                        onClick={toggleOverlay}
                        className='md:hidden bg-gray-700 text-gray-200 p-2 rounded-full hover:bg-gray-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400'
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
                    </button>
                    <form
                        action={handleOnLinkSubmit}
                        className='hidden md:flex md:flex-grow md:max-w-2xl md:ml-8'
                    >
                        <div className='flex items-center w-full'>
                            <input
                                type='text'
                                name='instagramLink'
                                placeholder='Enter Instagram image link'
                                className='flex-grow px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-full focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-200'
                            />
                            <button
                                type='submit'
                                className='bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-6 rounded-r-full hover:from-purple-600 hover:to-pink-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400'
                            >
                                Add
                            </button>
                        </div>
                    </form>
                </div>
            </nav>

            {isOverlayOpen && (
                <div className='fixed inset-0 bg-black bg-opacity-70 z-20 flex items-center justify-center md:hidden'>
                    <div className='bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-lg w-11/12 max-w-md shadow-xl'>
                        <form action={handleOnLinkSubmit}>
                            <input
                                type='text'
                                name='instagramLink'
                                placeholder='Enter Instagram image link'
                                className='w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-200 mb-4'
                            />
                            <div className='flex justify-end space-x-3'>
                                <button
                                    type='button'
                                    onClick={toggleOverlay}
                                    className='px-5 py-2 border border-gray-600 rounded-full hover:bg-gray-700 transition duration-300 text-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500'
                                >
                                    Cancel
                                </button>
                                <button
                                    type='submit'
                                    className='bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-6 rounded-full hover:from-purple-600 hover:to-pink-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400'
                                >
                                    Add
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;
