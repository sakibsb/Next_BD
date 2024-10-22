import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import VerticalProductCart from '../components/VerticalProductCart';

const SearchProduct = () => {
  const query = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); // State for search input

  const fetchProduct = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(SummaryApi.searchProduct.url + query.search);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const dataResponse = await response.json();
      setData(dataResponse.data);
    } catch (error) {
      setError('Failed to fetch products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query.search) {
      fetchProduct();
    }
  }, [query]);

  // Use effect for back button navigation
  useEffect(() => {
    const handleBackButton = (event) => {
      const activeElement = document.activeElement;

      // Check if Backspace key is pressed
      if (event.key === 'Backspace') {
        if (activeElement.tagName !== 'INPUT' && activeElement.tagName !== 'TEXTAREA') {
          event.preventDefault(); // Prevent the default backspace behavior
          navigate(-1); // Navigate to the previous page
        }
      }
    };

    window.addEventListener('keydown', handleBackButton);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleBackButton);
    };
  }, [navigate]);

  return (
    <div className='container mx-auto p-6'>
      <input
        type='text'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Update search term state
        placeholder='Search for products...'
        className='border rounded p-2 mb-4 w-full'
      />
      {loading && (
        <p className='text-lg text-center text-gray-500'>
          Loading...
        </p>
      )}
      {error && (
        <p className='text-lg text-center text-red-500'>
          {error}
        </p>
      )}
      {!loading && (
        <>
          <p className='text-lg font-semibold my-3'>Search Products: {data.length}</p>
          {data.length === 0 ? (
            <p className='text-lg text-center p-4 bg-white rounded shadow'>
              No Products Found...
            </p>
          ) : (
            <VerticalProductCart data={data} />
          )}
        </>
      )}
    </div>
  );
};

export default SearchProduct;