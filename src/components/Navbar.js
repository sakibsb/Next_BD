import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const categoryLoading = new Array(5).fill(null); // Placeholder for loading state

    const fetchCategories = async () => {
        try {
            const response = await fetch(SummaryApi.categoryProduct.url);
            const dataResponse = await response.json();
            if (dataResponse.success) {
                setCategories(dataResponse.data);
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
        fetchCategories();

        // Event listener for back button functionality
        const handleBackButton = (event) => {
            if (event.key === "Backspace") { // Detecting the Backspace key
                event.preventDefault(); // Prevent default action
                window.history.back(); // Go back to the previous page
            }
        };

        // Add event listener to handle back button press
        window.addEventListener("keydown", handleBackButton);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener("keydown", handleBackButton);
        };
    }, []); // Only run on mount and unmount

    return (
        <nav className="bg-blue-600 p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <div className='flex items-center gap-6 overflow-x-auto scrollbar-none'> {/* Increased gap for better padding */}
                    {loading ? (
                        categoryLoading.map((_, index) => (
                            <div
                                className='h-10 w-24 rounded-full bg-slate-300 animate-pulse'
                                key={`navLoading-${index}`}
                            />
                        ))
                    ) : (
                        categories.length > 0 ? (
                            categories.map((category, index) => (
                                <Link
                                    to={`/product-category?category=${category?.category}`} // Same route as CategoryList
                                    className='text-white hover:text-yellow-300 transition'
                                    key={`${category?.category}-${index}`}
                                >
                                    <p className='text-sm md:text-base capitalize'>{category?.category}</p> {/* All names in English */}
                                </Link>
                            ))
                        ) : (
                            <p className='text-center text-gray-500'>No categories available.</p>
                        )
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;