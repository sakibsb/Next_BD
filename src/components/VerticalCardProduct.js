import React, { useContext, useEffect, useRef, useState } from 'react';
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct';
import displayBDCurrency from '../helpers/displayCurrency';
import { FaAnglesRight, FaAnglesLeft } from 'react-icons/fa6';
import addToCart from '../helpers/addToCart';
import { Link } from 'react-router-dom';
import Context from '../context';

const VerticalCardProduct = ({ category, heading }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const loadingList = new Array(13).fill(null);
    const { fetchUserAddToCart } = useContext(Context);

    const handleAddToCart = async (e, id) => {
        await addToCart(e, id);
        fetchUserAddToCart();
    };

    const scrollElement = useRef();

    const fetchData = async () => {
        setLoading(true);
        const categoryProduct = await fetchCategoryWiseProduct(category);
        setLoading(false);
        setData(categoryProduct?.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const scrollRight = () => {
        scrollElement.current.scrollLeft += 300;
    };

    const scrollLeft = () => {
        scrollElement.current.scrollLeft -= 300;
    };

    return (
        <div className="container mx-auto px-4 my-6 relative">
            <h2 className="text-3xl font-semibold py-4">{heading}</h2>

            <div className="relative">
                {/* Scroll Left Button */}
                <button
                    className="absolute top-1/2 transform -translate-y-1/2 left-0 bg-gradient-to-r from-gray-800 to-gray-500 shadow-lg rounded-full p-3 z-10 text-white hidden md:flex hover:bg-gray-700 transition duration-300"
                    onClick={scrollLeft}
                    style={{ zIndex: 10 }}
                >
                    <FaAnglesLeft size={24} />
                </button>

                {/* Product Cards */}
                <div className="flex items-center gap-4 md:gap-6 overflow-x-scroll scrollbar-hide transition-all" ref={scrollElement}>
                    {loading ? (
                        loadingList.map((_, index) => (
                            <div key={index} className="w-full min-w-[140px] md:min-w-[240px] max-w-[140px] md:max-w-[240px] bg-white rounded-md shadow-lg">
                                <div className="bg-slate-200 h-48 p-4 flex justify-center items-center animate-pulse rounded-lg"></div>
                                <div className="p-4 grid gap-2">
                                    <div className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 animate-pulse bg-slate-200 rounded-full py-2"></div>
                                    <div className="capitalize text-slate-500 p-1 animate-pulse bg-slate-200 rounded-full py-2"></div>
                                    <div className="flex gap-3">
                                        <div className="text-green-600 font-medium p-1 animate-pulse bg-slate-200 rounded-full w-full py-2"></div>
                                        <div className="text-slate-400 line-through p-1 animate-pulse bg-slate-200 rounded-full w-full py-2"></div>
                                    </div>
                                    <div className="flex justify-center items-center p-2">
                                        <button className="w-32 h-8 items-center justify-center text-sm animate-pulse bg-slate-200 rounded-full"></button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        data.map((product) => (
                            <Link to={`/product/${product?._id}`} key={product?._id} className="w-full min-w-[140px] md:min-w-[240px] max-w-[140px] md:max-w-[240px] bg-white rounded-md shadow-lg hover:shadow-2xl transition-shadow duration-300">
                                <div className="bg-slate-200 h-48 p-4 flex justify-center items-center rounded-lg">
                                    <img src={product.productImage[0]} className="object-scale-down h-full hover:scale-105 transition-transform duration-300" alt={product?.productName} />
                                </div>
                                <div className="p-4 grid gap-2">
                                    <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black">{product?.productName}</h2>
                                    <p className="capitalize text-slate-500">{product?.category}</p>
                                    <div className="flex gap-3">
                                        <p className="text-green-600 font-medium">{displayBDCurrency(product?.sellingPrice)}</p>
                                        <p className="text-slate-400 line-through">{displayBDCurrency(product?.price)}</p>
                                    </div>
                                    <div className="flex justify-center items-center p-4">
                                        <button
                                            className="w-36 h-10 flex items-center justify-center text-sm bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white rounded-full transition-colors duration-300"
                                            onClick={(e) => handleAddToCart(e, product?._id)}>
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        ))
                    )}
                </div>

                {/* Scroll Right Button */}
                <button
                    className="absolute top-1/2 transform -translate-y-1/2 right-0 bg-gradient-to-l from-gray-800 to-gray-500 shadow-lg rounded-full p-3 z-10 text-white hidden md:flex hover:bg-gray-700 transition duration-300"
                    onClick={scrollRight}
                    style={{ zIndex: 10 }}
                >
                    <FaAnglesRight size={24} />
                </button>
            </div>
        </div>
    );
};

export default VerticalCardProduct;