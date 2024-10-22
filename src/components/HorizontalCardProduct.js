import React, { useEffect, useRef, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct';
import displayBDCurrency from '../helpers/displayCurrency';
import { FaAnglesRight, FaAnglesLeft } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import addToCart from '../helpers/addToCart';
import Context from '../context';

const HorizontalCardProduct = ({ category, heading }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const loadingList = new Array(13).fill(null);
    const scrollElement = useRef();
    const { fetchUserAddToCart } = useContext(Context);

    const handleAddToCart = async (e, id) => {
        await addToCart(e, id);
        fetchUserAddToCart();
    };

    const fetchData = async () => {
        setLoading(true);
        const categoryProduct = await fetchCategoryWiseProduct(category);
        setLoading(false);
        setData(categoryProduct?.data);
    };

    useEffect(() => {
        fetchData();
    }, [category]);

    const scrollRight = () => {
        scrollElement.current.scrollLeft += 300;
    };

    const scrollLeft = () => {
        scrollElement.current.scrollLeft -= 300;
    };

    return (
        <div className='container mx-auto px-4 my-6 relative bg-[#F7F7F7]'>
            <h2 className='text-2xl font-semibold py-4 text-[#333333]'>{heading}</h2>

            <div className='flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all' ref={scrollElement}>
                <button
                    className='bg-white shadow-lg rounded-full p-2 absolute left-0 text-lg hidden md:block hover:bg-[#5BC0BE] transition duration-300'
                    onClick={scrollLeft}
                    aria-label="Scroll left"
                >
                    <FaAnglesLeft />
                </button>
                <button
                    className='bg-white shadow-lg rounded-full p-2 absolute right-0 text-lg hidden md:block hover:bg-[#5BC0BE] transition duration-300'
                    onClick={scrollRight}
                    aria-label="Scroll right"
                >
                    <FaAnglesRight />
                </button>

                {loading ? (
                    loadingList.map((_, index) => (
                        <div key={index} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-lg shadow-lg flex transition duration-300 transform hover:shadow-xl'>
                            <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[140px] animate-pulse'></div>
                            <div className='p-4 grid gap-2 w-full'>
                                <h2 className='font-medium text-lg text-ellipsis line-clamp-2 text-black bg-slate-200 animate-pulse p-1 rounded-full'></h2>
                                <p className='capitalize text-slate-500 p-1 bg-slate-200 animate-pulse rounded-full'></p>
                                <div className='flex gap-3 w-full'>
                                    <p className='text-red-600 font-medium text-sm p-1 bg-slate-200 w-full animate-pulse rounded-full'></p>
                                    <p className='text-slate-400 line-through text-sm p-1 bg-slate-200 w-full animate-pulse rounded-full'></p>
                                </div>
                                <div className='flex justify-center items-center'>
                                    <button className='items-center justify-center text-sm text-white px-3 py-0.5 rounded-full w-full h-8 bg-slate-200 animate-pulse'></button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    data.map((product) => (
                        <Link key={product._id} to={`product/${product._id}`} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-lg shadow-lg flex transition duration-300 transform hover:shadow-xl'>
                            <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[140px]'>
                                <img src={product.productImage[0]} className='object-scale-down h-full hover:scale-110 transition-all' alt={product.productName} />
                            </div>
                            <div className='p-4 grid gap-1'>
                                <h2 className='font-medium text-lg text-ellipsis line-clamp-2 text-[#333333]'>{product.productName}</h2>
                                <p className='capitalize text-slate-500'>{product.category}</p>
                                <div className='flex gap-3'>
                                    <p className='text-[#FF6F61] font-medium text-sm'>{displayBDCurrency(product.sellingPrice)}</p>
                                    <p className='text-slate-400 line-through text-sm'>{displayBDCurrency(product.price)}</p>
                                </div>
                                <div className='flex justify-center items-center'>
                                    <button className='w-24 items-center justify-center text-sm bg-[#007BFF] hover:bg-[#0056b3] text-white px-3 py-0.5 rounded-full transition duration-300' onClick={(e) => handleAddToCart(e, product._id)}>Add to Cart</button>
                                </div>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
};

// Prop Types for validation
HorizontalCardProduct.propTypes = {
    category: PropTypes.string.isRequired,
    heading: PropTypes.string.isRequired,
};

export default HorizontalCardProduct;