import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayBDCurrency from '../helpers/displayCurrency'
import { FaAnglesRight } from "react-icons/fa6";
import { FaAnglesLeft } from "react-icons/fa6";
import addToCart from '../helpers/addToCart'
import { Link } from 'react-router-dom';
import Context from '../context';

const VerticalCardProduct = ({ category, heading }) => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const loadingList = new Array(13).fill(null)

    const { fetchUserAddToCart } = useContext(Context)

    const handleAddToCart = async (e, id) => {
        await addToCart(e, id)
        fetchUserAddToCart()
    }

    const [scroll, setScroll] = useState(0)
    const scrollElement = useRef()

    const fetchData = async () => {
        setLoading(true)
        const categoryProduct = await fetchCategoryWiseProduct(category)
        setLoading(false)
        setData(categoryProduct?.data)
    }


    useEffect(() => {
        fetchData()
    }, [])

    const scrollRight = () => {
        scrollElement.current.scrollLeft += 300
    }

    const scrollLeft = () => {
        scrollElement.current.scrollLeft -= 300
    }


    return (
        <div className='container mx-auto px-4 my-6 relative'>
            <h2 className='text-2xl font-semibold py-4'>{heading}</h2>

            <div className='flex items-center gap-4 md:gap-6 overflow-x-scroll scrollbar-none transition-all' ref={scrollElement}>
                <button className='bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block' onClick={scrollLeft}><FaAnglesLeft /></button>
                <button className='bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block' onClick={scrollRight} > <FaAnglesRight /></button>
                {
                    loading ?(
                        loadingList.map((product, index) => {
                            return (
                                <div className='w-full min-w-[120px] md:min-w-[220px] max-w-[120px] md:max-w-[220px] bg-white rounded-sm shadow '>
                                    <div className='bg-slate-200 h-48 p-4 min-w-[120px] md:min-w-[140px] flex justify-center items-center animate-pulse'>
                                       
                                    </div>
                                    <div className='p-4 grid gap-2'>
                                        <h2 className='font-medium text--base md:text-lg text-ellipsis line-clamp-1 text-black p-1 animate-pulse bg-slate-200 rounded-full py-2'> </h2>
                                        <p className='capitalize text-slate-500  p-1 animate-pulse bg-slate-200 rounded-full py-2'></p>
                                        <div className='flex gap-3 '>
                                            <p className='text-red-600 font-medium  p-1 animate-pulse bg-slate-200 rounded-full w-full py-2'> </p>
                                            <p className='text-slate-400 line-through  p-1 animate-pulse bg-slate-200 rounded-full w-full py-2'> </p>
                                        </div>
                                        <div className='flex justify-center items-center p-2'>
                                            <button className='w-32 h-8 items-center justify-center text-sm  text-white px-3 py-0.5  p-1 animate-pulse bg-slate-200 rounded-full'> </button>
                                        </div>

                                    </div>

                                </div>
                            )
                        })
                    ) : (data.map((product, index) => {
                        return (
                            <Link to={"product/" + product?._id} className='w-full min-w-[120px] md:min-w-[220px] max-w-[120px] md:max-w-[220px] bg-white rounded-sm shadow '>
                                <div className='bg-slate-200 h-48 p-4 min-w-[120px] md:min-w-[140px] flex justify-center items-center'>
                                    <img src={product.productImage[0]} className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply' alt='' />
                                </div>
                                <div className='p-4 grid gap-2'>
                                    <h2 className='font-medium text--base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                                    <p className='capitalize text-slate-500'>{product?.category}</p>
                                    <div className='flex gap-3 '>
                                        <p className='text-red-600 font-medium'>{displayBDCurrency(product?.sellingPrice)}</p>
                                        <p className='text-slate-400 line-through '>{displayBDCurrency(product?.price)}</p>
                                    </div>
                                    <div className='flex justify-center items-center p-4'>
                                        <button className='w-32 h-8 items-center justify-center text-sm bg-red-500 hover:bg-red-700 text-white px-3 py-0.5 rounded-full' onClick={(e) => handleAddToCart(e, product?._id)}>Add to Cart</button>
                                    </div>

                                </div>

                            </Link>
                        )
                    })
                    )
                   
                }
            </div>


        </div>
    )
}

export default VerticalCardProduct