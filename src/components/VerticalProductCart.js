import React, { useContext } from 'react';
import scrollTop from '../helpers/scrollTop';
import { Link } from 'react-router-dom';
import displayBDCurrency from '../helpers/displayCurrency';
import addToCart from '../helpers/addToCart';
import Context from '../context';

const VerticalProductCart = ({ loading, data = [] }) => {
    const loadingList = new Array(13).fill(null);
    const { fetchUserAddToCart } = useContext(Context);

    const handleAddToCart = async (e, id) => {
        await addToCart(e, id);
        fetchUserAddToCart();
    };

    return (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,300px))] justify-center md:justify-between gap-6 transition-all">
            {loading ? (
                loadingList.map((_, index) => (
                    <div
                        key={index}
                        className="w-full min-w-[120px] md:min-w-[220px] max-w-[120px] md:max-w-[220px] bg-gray-100 rounded-lg shadow-lg animate-pulse"
                        onClick={scrollTop}
                    >
                        <div className="bg-gray-200 h-48 p-4 flex justify-center items-center"></div>
                        <div className="p-4 grid gap-2">
                            <h2 className="font-medium text-lg bg-gray-200 rounded-md py-2"></h2>
                            <p className="capitalize text-gray-500 bg-gray-200 rounded-md py-2"></p>
                            <div className="flex gap-3">
                                <p className="text-green-600 font-medium bg-gray-200 rounded-md py-2 w-full"></p>
                                <p className="text-gray-400 line-through bg-gray-200 rounded-md py-2 w-full"></p>
                            </div>
                            <div className="flex justify-center items-center">
                                <button className="w-32 h-8 bg-gray-200 rounded-full"></button>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                data.map((product, index) => (
                    <Link
                        to={`/product/${product?._id}`}
                        key={index}
                        className="w-full min-w-[120px] md:min-w-[220px] max-w-[120px] md:max-w-[220px] bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                        onClick={scrollTop}
                    >
                        <div className="bg-gray-200 h-48 p-4 flex justify-center items-center">
                            <img
                                src={product.productImage[0]}
                                className="object-cover h-full hover:scale-105 transition-transform duration-300"
                                alt={product?.productName}
                            />
                        </div>
                        <div className="p-4 grid gap-2">
                            <h2 className="font-medium text-lg text-black line-clamp-1">{product?.productName}</h2>
                            <p className="capitalize text-gray-600">{product?.category}</p>
                            <div className="flex gap-3">
                                <p className="text-green-600 font-medium">{displayBDCurrency(product?.sellingPrice)}</p>
                                <p className="text-gray-400 line-through">{displayBDCurrency(product?.price)}</p>
                            </div>
                            <div className="flex justify-center items-center p-4">
                                <button
                                    className="w-32 h-10 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-semibold rounded-lg transition-colors duration-300"
                                    onClick={(e) => handleAddToCart(e, product?._id)}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </Link>
                ))
            )}
        </div>
    );
};

export default VerticalProductCart;