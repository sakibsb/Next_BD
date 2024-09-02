import React, { useState } from 'react'
import { FaEdit } from "react-icons/fa";
import AdminEditProduct from './AdminEditProduct';
import displayBDCurrency from '../helpers/displayCurrency';

const AdminProductCard = ({
  data,
  fetchData
}) => {
  const [editProduct, setEidtProduct] = useState(false)
  return (
    <div className='bg-white p-4 rounded '>
      <div className='w-40 '>
        <div className='w-32 h-32 flex justify-center items-center'>
          <img src={data?.productImage[0]} alt='' width={160} hight={1600} className='mx-auto object-fill h-full' />
        </div>
        <h1 className='text-ellipsis line-clamp-2'>{data.productName}</h1>

        <div>
          <p className='font-semibold'>
            {
              displayBDCurrency(data.sellingPrice)
            }

          </p>
          <div className='w-fit ml-auto p-2 bg-blue-100 hover:bg-blue-600 rounded-full hover:text-white cursor-pointer'
            onClick={() => setEidtProduct(true)}>
            <FaEdit />
          </div>
        </div>

      </div>
      {
        editProduct && (
          <AdminEditProduct editData={data} onClose={() => setEidtProduct(false)} fetchData={fetchData} />
        )
      }

    </div>
  )
}

export default AdminProductCard