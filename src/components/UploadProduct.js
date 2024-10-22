import React, { useState } from 'react';
import { IoCloseSharp } from "react-icons/io5";
import productCategory from '../helpers/productCategory';
import { ImFolderUpload } from "react-icons/im";
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage';
import { MdDelete } from "react-icons/md";
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const UploadProduct = ({ onClose, fetchData }) => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: ""
  });

  const [OpenFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [FullScreenImage, setFullScreenImage] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const uploadImageCloudinary = await uploadImage(file);
        setData((prev) => ({
          ...prev,
          productImage: [...prev.productImage, uploadImageCloudinary.url]
        }));
      } catch (error) {
        toast.error('Failed to upload image. Please check your permissions.');
      }
    }
  };

  const handleDeleteProductImage = async (index) => {
    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);
    setData((prev) => ({
      ...prev,
      productImage: newProductImage
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(SummaryApi.uploadProduct.url, {
        method: SummaryApi.uploadProduct.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        toast.success(responseData.message);
        onClose();
        fetchData();
      } else {
        const errorMessage = await response.text();
        toast.error(`Error: ${errorMessage}`);
      }
    } catch (error) {
      toast.error('An error occurred while submitting the form. Please check your network or permissions.');
    }
  };

  return (
    <div className='fixed w-full h-full bg-gray-900 bg-opacity-80 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
      <div className='bg-white p-8 rounded-lg w-full max-w-2xl h-full max-h-[90%] overflow-hidden shadow-2xl'>
        <div className='flex justify-between items-center pb-6'>
          <h2 className='font-bold text-2xl text-gray-800'>Upload Product</h2>
          <div className='text-3xl text-gray-600 hover:text-red-500 cursor-pointer' onClick={onClose}>
            <IoCloseSharp />
          </div>
        </div>

        <form className='grid gap-5 overflow-y-scroll h-full pb-6' onSubmit={handleSubmit}>
          <label htmlFor='productName'>Product Name:</label>
          <input
            type='text'
            id='productName'
            placeholder='Enter product name'
            name='productName'
            value={data.productName}
            onChange={handleOnChange}
            className='p-3 bg-gray-200 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            required
          />

          <label htmlFor='brandName'>Brand Name:</label>
          <input
            type='text'
            id='brandName'
            placeholder='Enter brand name'
            name='brandName'
            value={data.brandName}
            onChange={handleOnChange}
            className='p-3 bg-gray-200 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            required
          />

          <label htmlFor='category'>Category:</label>
          <select required value={data.category} name='category' onChange={handleOnChange} className='p-3 bg-gray-200 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'>
            <option value="">Select Category</option>
            {productCategory.map((el, index) => (
              <option value={el.value} key={el.value + index}>{el.label}</option>
            ))}
          </select>

          <label htmlFor='productImage'>Product Image:</label>
          <label htmlFor='uploadImageInput'>
            <div className='p-6 border border-gray-400 rounded-lg bg-gray-200 flex justify-center items-center cursor-pointer'>
              <div className='text-gray-600 flex flex-col items-center'>
                <span className='text-5xl'><ImFolderUpload /></span>
                <p className='text-base'>Upload Product Image</p>
                <input type='file' id='uploadImageInput' className='hidden' onChange={handleUploadProduct} />
              </div>
            </div>
          </label>

          <div>
            {data.productImage[0] ? (
              <div className='flex flex-wrap gap-3'>
                {data.productImage.map((el, index) => (
                  <div className='relative group' key={index}>
                    <img
                      src={el}
                      alt={el}
                      width={120}
                      height={120}
                      className='bg-gray-200 border border-gray-400 cursor-pointer rounded-lg'
                      onClick={() => {
                        setOpenFullScreenImage(true);
                        setFullScreenImage(el);
                      }}
                    />
                    <div className='absolute top-0 right-0 p-2 bg-red-500 rounded-full text-white hover:bg-red-600 cursor-pointer hidden group-hover:block'
                      onClick={() => handleDeleteProductImage(index)}>
                      <MdDelete />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className='text-red-600 text-xs'>*Please Upload Product Image</p>
            )}
          </div>

          <label htmlFor='price'>Price:</label>
          <input
            type='number'
            id='price'
            placeholder='Enter product price'
            name='price'
            value={data.price}
            onChange={handleOnChange}
            className='p-3 bg-gray-200 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            required
          />

          <label htmlFor='sellingPrice'>Selling Price:</label>
          <input
            type='number'
            id='sellingPrice'
            placeholder='Enter product selling price'
            name='sellingPrice'
            value={data.sellingPrice}
            onChange={handleOnChange}
            className='p-3 bg-gray-200 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            required
          />

          <label htmlFor='description'>Description:</label>
          <textarea className='h-32 bg-gray-200 border border-gray-400 resize-none p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Enter product description'
            rows={3}
            onChange={handleOnChange}
            name='description'
          />

          <button className='px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300'>Upload Product</button>
        </form>
      </div>
      {OpenFullScreenImage && (
        <DisplayImage onClose={() => setOpenFullScreenImage(false)} imgUrl={FullScreenImage} />
      )}
    </div>
  );
}

export default UploadProduct;