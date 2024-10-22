import React from 'react';
import { IoCloseSharp } from 'react-icons/io5';

const DisplayImage = ({ imgUrl, onClose }) => {
    return (
        <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-75 z-50'>
            <div className='bg-white shadow-lg rounded-lg max-w-5xl mx-auto p-4 relative'>
                {/* Close Button */}
                <button
                    className='absolute top-2 right-2 text-2xl hover:text-red-600 focus:outline-none'
                    onClick={onClose}
                    aria-label="Close Image"
                >
                    <IoCloseSharp />
                </button>

                {/* Image Container */}
                <div className='flex justify-center p-3 max-h-[80vh] max-w-[80vh] overflow-hidden'>
                    <img
                        src={imgUrl}
                        alt='Display'
                        className='object-contain max-h-full max-w-full'
                    />
                </div>
            </div>
        </div>
    );
}

export default DisplayImage;