import { useEffect, useState } from 'react';
import UploadProduct from '../components/UploadProduct';
import SummaryApi from '../common';
import AdminProductCard from '../components/AdminProductCard';
import { toast } from 'react-toastify';

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const fetchAllProduct = async () => {
    try {
      setLoading(true); // Set loading state
      const response = await fetch(SummaryApi.allProduct.url);

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const dataResponse = await response.json();
      setAllProduct(dataResponse?.data || []); // Ensure data is set correctly
    } catch (err) {
      setError(err.message); // Set error message
      toast.error(err.message); // Notify error
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  return (
    <div>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>All Products</h2>
        <button
          className='border-2 border-red-700 text-red-700 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full'
          onClick={() => setOpenUploadProduct(true)}
        >
          Upload Product
        </button>
      </div>
      {/***All Products */}
      <div className='flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll'>
        {loading ? (
          <p className="text-center">Loading products...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          allProduct.map((product, index) => (
            <AdminProductCard data={product} key={index + "allProduct"} fetchData={fetchAllProduct} />
          ))
        )}
      </div>
      {/**Upload Product Component */}
      {openUploadProduct && (
        <UploadProduct onClose={() => setOpenUploadProduct(false)} fetchData={fetchAllProduct} />
      )}
    </div>
  );
};

export default AllProducts;
