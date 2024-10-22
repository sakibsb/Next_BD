import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { Link } from 'react-router-dom';

const CategoryList = () => {
    const [categoryProduct, setCategoryProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const categoryLoading = new Array(13).fill(null); // Placeholder for loading state

    const fetchCategoryProduct = async () => {
        try {
            const response = await fetch(SummaryApi.categoryProduct.url);
            const dataResponse = await response.json();
            if (dataResponse.success) {
                setCategoryProduct(dataResponse.data);
            } else {
                console.error("Error fetching categories:", dataResponse.message);
            }
        } catch (error) {
            console.error("Network error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategoryProduct();
    }, []);

    // Function to convert English names to Bengali
    const getBengaliName = (category) => {
        switch (category) {
            case 'airpodes':
                return 'এয়ারপডস';
            case 'books':
                return 'বই';
            case 'camera':
                return 'ক্যামেরা';
            case 'earphones':
                return 'ইয়ারফোনস';
            case 'mobiles':
                return 'মোবাইলস';
            case 'mouse':
                return 'মাউস';
            case 'printers':
                return 'প্রিন্টারস';
            case 'processor':
                return 'প্রসেসর';
            case 'refrigerator':
                return 'রেফ্রিজারেটর';
            case 'speakers':
                return 'স্পিকারস';
            case 'television':
                return 'টেলিভিশন';
            case 'trimmers':
                return 'ট্রিমারস';
            case 'watches':
                return 'ঘড়ি';
            default:
                return category; // Fallback to original category name
        }
    };

    return (
        <div className='container mx-auto p-4'>
            <div className='flex items-center gap-4 justify-between overflow-scroll scrollbar-none'>
                {loading ? (
                    categoryLoading.map((_, index) => (
                        <div
                            className='h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse'
                            key={`categoryLoading-${index}`}
                        />
                    ))
                ) : (
                    categoryProduct.length > 0 ? (
                        categoryProduct.map((product, index) => (
                            <Link
                                to={`/product-category?category=${product.category}`} // Keep original name for routing
                                className='cursor-pointer text-center'
                                key={`${product.category}-${index}`}
                            >
                                <div className='w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center'>
                                    <img
                                        src={product.productImage[0]}
                                        alt={product.category}
                                        className='h-full object-scale-down mix-blend-multiply hover:scale-125 transition-transform'
                                    />
                                </div>
                                <p className='text-sm md:text-base capitalize'>
                                    {getBengaliName(product.category)} {/* Bengali Name */}
                                </p>
                            </Link>
                        ))
                    ) : (
                        <p className='text-center text-gray-500'>No categories available.</p>
                    )
                )}
            </div>
        </div>
    );
};

export default CategoryList;