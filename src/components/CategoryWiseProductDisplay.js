import React, { useContext, useEffect, useState } from 'react';
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct';
import displayBDCurrency from '../helpers/displayCurrency';
import addToCart from '../helpers/addToCart';
import { Link } from 'react-router-dom';
import Context from '../context';
import scrollTop from '../helpers/scrollTop';

const CategoryWiseProductDisplay = ({ category, heading }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const loadingList = new Array(8).fill(null); // Reduced loading skeletons for better display
    const { fetchUserAddToCart } = useContext(Context);

    const handleAddToCart = async (e, id) => {
        await addToCart(e, id);
        fetchUserAddToCart();
    };

    const fetchData = async () => {
        setLoading(true);
        const categoryProduct = await fetchCategoryWiseProduct(category);
        setLoading(false);
        setData(categoryProduct?.data || []);
    };

    useEffect(() => {
        fetchData();
    }, [category]);

    return (
        <div className='container mx-auto px-4 my-6 relative'>
            <h2 className='text-2xl font-semibold py-4 text-gray-700'>{heading}</h2>

            <div className='grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6'>
                {loading ? (
                    loadingList.map((_, index) => (
                        <div
                            key={index}
                            className='w-full bg-white rounded-lg shadow-md p-4 animate-pulse'
                        >
                            <div className='bg-gray-200 h-48 rounded-md mb-4'></div>
                            <div className='h-6 bg-gray-200 rounded-full mb-2'></div>
                            <div className='h-4 bg-gray-200 rounded-full mb-2'></div>
                            <div className='h-4 bg-gray-200 rounded-full mb-4'></div>
                            <div className='h-8 bg-gray-200 rounded-full'></div>
                        </div>
                    ))
                ) : (
                    data.length > 0 ? (
                        data.map((product, index) => (
                            <Link
                                key={index}
                                to={`/product/${product?._id}`}
                                className='w-full bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow'
                            >
                                <div className='bg-gray-100 h-48 p-4 rounded-md flex justify-center items-center'>
                                    <img
                                        src={product.productImage[0]}
                                        className='object-contain h-full hover:scale-105 transition-transform'
                                        alt={product?.productName}
                                    />
                                </div>
                                <div className='p-4'>
                                    <h2 className='font-medium text-lg text-gray-800 line-clamp-1'>
                                        {product?.productName}
                                    </h2>
                                    <p className='capitalize text-gray-500'>
                                        {product?.category}
                                    </p>
                                    <div className='flex justify-between items-center mt-2'>
                                        <p className='text-red-600 font-semibold'>
                                            {displayBDCurrency(product?.sellingPrice)}
                                        </p>
                                        <p className='text-gray-400 line-through'>
                                            {displayBDCurrency(product?.price)}
                                        </p>
                                    </div>
                                    <div className='mt-4 flex justify-center'>
                                        <button
                                            className='w-full h-10 bg-green-500 hover:bg-green-600 text-white rounded-full transition-colors'
                                            onClick={(e) => handleAddToCart(e, product?._id)}
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className='col-span-full text-center text-gray-500 py-4'>
                            No products found in this category.
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default CategoryWiseProductDisplay;