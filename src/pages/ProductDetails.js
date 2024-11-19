import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SummaryApi from '../common';
import { FaRegStarHalfStroke, FaStar } from "react-icons/fa6";
import displayBDCurrency from '../helpers/displayCurrency';
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay';
import addToCart from '../helpers/addToCart';
import Context from '../context';

const ProductDetails = () => {
    const [data, setData] = useState({
        productName: "",
        brandName: "",
        category: "",
        productImage: [],
        description: "",
        price: "",
        sellingPrice: ""
    });
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const productImageLoading = new Array(4).fill(null);
    const [activeImage, setActiveImage] = useState("");
    const [zoomImage, setZoomImage] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(false);
    const { fetchUserAddToCart } = useContext(Context);
    const navigate = useNavigate();

    const fetchProductDetails = async () => {
        setLoading(true);
        try {
            const response = await fetch(SummaryApi.productDetails.url, {
                method: SummaryApi.productDetails.method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ productId: params?.id })
            });

            if (!response.ok) throw new Error('Failed to fetch product details');
            const dataResponse = await response.json();
            setData(dataResponse?.data);
            setActiveImage(dataResponse?.data?.productImage[0]);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProductDetails();
        window.scrollTo(0, 0); // Scroll to top on component mount
    }, [params]);

    const handleMouseEnterProduct = (imageURL) => {
        setActiveImage(imageURL);
    };

    const handleZoomImage = useCallback((e) => {
        setZoom(true);
        const { left, top, width, height } = e.target.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;

        setZoomImage({ x, y });
    }, []);

    const handleZoomOutImage = () => {
        setZoom(false);
    };

    const handleAddToCart = async (e, id) => {
        await addToCart(e, id);
        fetchUserAddToCart();
    };

    const handleBuyProduct = async (e, id) => {
        await addToCart(e, id);
        fetchUserAddToCart();
        navigate("/cart");
    };

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`); // Adjust this based on your route structure
        window.scrollTo(0, 0); // Scroll to top of the page
    };

    return (
        <div className='container mx-auto p-4'>
            <div className='min-h-[200px] flex flex-col lg:flex-row gap-4'>
                {/* Product Image */}
                <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>
                    <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2'>
                        <img
                            src={activeImage}
                            className='h-full w-full object-scale-down mix-blend-multiply'
                            alt={data.productName}
                            onMouseMove={handleZoomImage}
                            onMouseLeave={handleZoomOutImage}
                        />
                        {/* Zoom Product */}
                        {zoom && (
                            <div className='hidden lg:block absolute min-w-[500px] min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0 overflow-hidden'>
                                <div
                                    className='w-full h-full min-h-[400px] min-w-[500px] mix-blend-normal scale-125'
                                    style={{
                                        backgroundImage: `url(${activeImage})`,
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: `${zoomImage.x * 100}% ${zoomImage.y * 100}%`
                                    }}
                                />
                            </div>
                        )}
                    </div>
                    <div className='h-full overflow-scroll scrollbar-none'>
                        {loading ? (
                            <div className='flex gap-3 lg:flex-col'>
                                {productImageLoading.map((_, index) => (
                                    <div className='h-20 w-20 bg-slate-200 rounded animate-pulse' key={`loadingImage-${index}`} />
                                ))}
                            </div>
                        ) : (
                            <div className='flex gap-3 lg:flex-col'>
                                {data?.productImage?.map((imgURL) => (
                                    <div className='h-20 w-20 bg-slate-200 rounded p-1' key={imgURL}>
                                        <img
                                            src={imgURL}
                                            className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer'
                                            alt=''
                                            onMouseEnter={() => handleMouseEnterProduct(imgURL)}
                                            onClick={() => handleMouseEnterProduct(imgURL)}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Product Details */}
                {loading ? (
                    <div className='flex flex-col gap-1'>
                        <p className='bg-slate-200 animate-pulse text-white px-20 py-2 rounded-full w-fit h-8 justify-center items-center inline-block' />
                        <h2 className='text-2xl lg:text-3xl font-medium h-6 bg-slate-200 animate-pulse rounded-full' />
                        <p className='capitalize text-slate-400 bg-slate-200 animate-pulse h-6 rounded-full' />
                        <div className='flex items-center gap-1 bg-slate-200 h-6 animate-pulse rounded-full w-full' />
                        <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1 h-8 animate-pulse w-full'>
                            <p className='text-red-600 bg-slate-200' />
                            <p className='text-slate-400 line-through bg-slate-200' />
                        </div>
                        <div className='flex items-center gap-3 my-2'>
                            <button className='h-6 bg-slate-200 rounded animate-pulse w-full' />
                            <button className='h-6 bg-slate-200 rounded animate-pulse w-full' />
                        </div>
                        <div>
                            <p className='text-slate-600 font-semibold my-1 h-6 bg-slate-200 rounded animate-pulse' />
                            <p className='bg-slate-200 rounded animate-pulse h-10' />
                        </div>
                    </div>
                ) : (
                    <div className='flex flex-col gap-1'>
                        <p className='bg-black text-white px-2 rounded-full w-fit h-8 justify-center items-center inline-block'>{data.brandName}</p>
                        <h2 className='text-2xl lg:text-3xl font-medium'>{data.productName}</h2>
                        <p className='capitalize text-slate-400'>{data.category}</p>
                        <div className='flex items-center gap-1'>
                            <FaStar /><FaStar /><FaStar /><FaStar /><FaRegStarHalfStroke />
                        </div>
                        <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1'>
                            <p className='text-red-600'>{displayBDCurrency(data.sellingPrice)}</p>
                            <p className='text-slate-400 line-through'>{displayBDCurrency(data.price)}</p>
                        </div>
                        {/* Conditionally render buttons based on zoom state */}
                        {!zoom && (
                            <div className='flex items-center gap-3 my-2'>
                                <button className='border-2 border-blue-600 rounded-full px-4 py-2 min-w-[100px] font-semibold bg-blue-600 text-white transition-transform transform hover:scale-105 hover:shadow-lg' onClick={(e) => handleBuyProduct(e, data?._id)}>
                                    Buy
                                </button>
                                <button className='border-2 border-blue-600 rounded-full px-4 py-2 min-w-[100px] font-semibold bg-blue-600 text-white transition-transform transform hover:scale-105 hover:shadow-lg' onClick={(e) => handleAddToCart(e, data?._id)}>
                                    Add to Cart
                                </button>
                            </div>
                        )}
                        <div>
                            <h3 className='text-xl font-semibold'>Description</h3>
                            <p className='my-1'>{data.description}</p>
                        </div>
                    </div>
                )}
            </div>
            {/* Category Wise Products */}
            <h2 className='text-2xl font-semibold my-4'>Related Products</h2>
            <CategoryWiseProductDisplay handleProductClick={handleProductClick} category={data.category} />
        </div>
    );
};

export default ProductDetails;