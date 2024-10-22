import React, { useState } from 'react';
import { FaEdit } from "react-icons/fa";
import AdminEditProduct from './AdminEditProduct';
import displayBDCurrency from '../helpers/displayCurrency';

const AdminProductCard = ({ data, fetchData }) => {
  const [editProduct, setEditProduct] = useState(false);
  const { productImage, productName, sellingPrice } = data;

  return (
    <div className='bg-white p-4 rounded shadow'>
      <div className='w-40'>
        <div className='w-32 h-32 flex justify-center items-center'>
          <img
            src={productImage[0]}
            alt={`Image of ${productName}`}
            width={160}
            height={160} // Corrected 'height' prop
            className='mx-auto object-cover h-full rounded' // Added rounded for a better look
          />
        </div>
        <h1 className='text-ellipsis line-clamp-2 font-semibold'>{productName}</h1>

        <div className='flex justify-between items-center mt-2'>
          <p className='font-semibold'>
            {displayBDCurrency(sellingPrice)}
          </p>
          <div
            className='w-fit p-2 bg-blue-100 hover:bg-blue-600 rounded-full hover:text-white cursor-pointer transition-colors'
            onClick={() => setEditProduct(true)}
            aria-label="Edit product"
          >
            <FaEdit />
          </div>
        </div>
      </div>
      {editProduct && (
        <AdminEditProduct
          editData={data}
          onClose={() => setEditProduct(false)}
          fetchData={fetchData}
        />
      )}
    </div>
  );
};

export default AdminProductCard;