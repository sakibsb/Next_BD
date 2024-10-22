import { useEffect, useState } from 'react';
import image1 from '../assest/banner/HomeCarousel1.png';
import image2 from '../assest/banner/HomeCarousel2.png';
import image3 from '../assest/banner/HomeCarousel3.png';
import image4 from '../assest/banner/HomeCarousel4.png';
import image5 from '../assest/banner/HomeCarousel5.png';
import image1Mobile from '../assest/banner/img1_mobile.jpg';
import image2Mobile from '../assest/banner/img2_mobile.webp';
import image3Mobile from '../assest/banner/img3_mobile.jpg';
import image4Mobile from '../assest/banner/img4_mobile.jpg';
import image5Mobile from '../assest/banner/img5_mobile.png';
import { FaAnglesRight, FaAnglesLeft } from "react-icons/fa6";

const BannerProduct = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const [isHovered, setIsHovered] = useState(false); // To track hover state
    const intervalTime = 5000; // Change interval duration here

    const images = {
        desktop: [image1, image2, image3, image4, image5],
        mobile: [image1Mobile, image2Mobile, image3Mobile, image4Mobile, image5Mobile]
    };

    const nextImage = () => {
        setCurrentImage((prev) => (prev < images.desktop.length - 1 ? prev + 1 : 0));
    };

    const prevImage = () => {
        setCurrentImage((prev) => (prev > 0 ? prev - 1 : images.desktop.length - 1));
    };

    useEffect(() => {
        if (!isHovered) {
            const interval = setInterval(nextImage, intervalTime);
            return () => clearInterval(interval);
        }
    }, [isHovered, currentImage]);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const isMobile = window.innerWidth < 768; // Adjust breakpoint as needed
    const currentImages = isMobile ? images.mobile : images.desktop;

    return (
        <div className='container mx-auto px-4 py-6'>
            <div
                className='h-56 md:h-72 w-full bg-slate-200 relative overflow-hidden rounded-lg'
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {/* Buttons for Desktop/Tablet */}
                <div className='absolute z-10 h-full w-full md:flex items-center justify-between hidden'>
                    <button className='bg-white shadow-md rounded-full p-2 text-3xl' onClick={prevImage} aria-label="Previous image">
                        <FaAnglesLeft />
                    </button>
                    <button className='bg-white shadow-md rounded-full p-2 text-3xl' onClick={nextImage} aria-label="Next image">
                        <FaAnglesRight />
                    </button>
                </div>

                {/* Carousel */}
                <div className='flex h-full w-full'>
                    {currentImages.map((imageURL, index) => (
                        <div
                            key={index}
                            className='w-full h-full min-w-full transition-transform duration-500 ease-in-out'
                            style={{ transform: `translateX(-${currentImage * 100}%)` }}
                        >
                            <img src={imageURL} className='w-full h-full object-cover' alt={`carousel-${index}`} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BannerProduct;