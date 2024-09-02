import React, { useState } from 'react'
import { IoCloseSharp } from "react-icons/io5";
import productCategory from '../helpers/productCategory';
import { ImFolderUpload } from "react-icons/im";
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage';
import { MdDelete } from "react-icons/md"
import SummaryApi from '../common';
import { toast } from 'react-toastify'

const AdminEditProduct = ({
        onClose,
        editData,
        fetchData
    }) => {
    const [data, setData] = useState({
        ...editData ,
        productName: editData?.productName,
        brandName: editData?.brandName,
        category: editData?.category,
        productImage: editData?.productImage || [],
        description: editData?.description,
        price: editData?.price,
        sellingPrice: editData?.sellingPrice
    })

    const [OpenFullScreenImage, setOpenFullScreenImage] = useState(false)
    const [FullScreenImage, setFullScreenImage] = useState("")

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }
    const handleUploadProduct = async (e) => {
        const file = e.target.files[0]
        const uploadImageCloudinary = await uploadImage(file)

        setData((preve) => {
            return {
                ...preve,
                productImage: [...preve.productImage, uploadImageCloudinary.url]
            }
        })
    }

    const handleDeleteProductImage = async (index) => {
        console.log("image index", index)
        const newProductImage = [...data.productImage]
        newProductImage.splice(index, 1)
        setData((preve) => {
            return {
                ...preve,
                productImage: [...newProductImage]
            }
        })
    }



    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(SummaryApi.updateProduct.url, {
                method: SummaryApi.updateProduct.method,
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
                fetchData()
            } else {
                const errorMessage = await response.text();
                toast.error(errorMessage);
            }
        } catch (error) {
            toast.error('An error occurred while submitting the form.');
        }
    };
  return (
      <div className='fixed w-full h-full bg-slate-200 bg-opacity-40 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
          <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[70%] overflow-hidden'>
              <div className='flex justify-center items-center pb-3'>
                  <h2 className='font-bold text-lg'>
                      Edit Product
                  </h2>
                  <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
                      <IoCloseSharp />
                  </div>
              </div>

              <form className='grid gap-2 overflow-y-scroll h-full pb-5' onSubmit={handleSubmit}>
                  <label htmlFor='productName'>Product Name :</label>
                  <input
                      type='text'
                      id='productName'
                      placeholder='enter product name'
                      name='productName'
                      value={data.productName}
                      onChange={handleOnChange}
                      className='p-2 bg-slate-100 border rounded'
                      required
                  />

                  <label htmlFor='brandName' className='mt-3'>Brand Name :</label>
                  <input
                      type='text'
                      id='brandName'
                      placeholder='enter brand name'
                      name='brandName'
                      value={data.brandName}
                      onChange={handleOnChange}
                      className='p-2 bg-slate-100 border rounded'
                      required
                  />
                  <label htmlFor='category' className='mt-3'>Category :</label>
                  <select required value={data.category} name='category' onChange={handleOnChange} className='p-2 bg-slate-100 border rounded'>
                      <option value={""}>Select Category</option>
                      {
                          productCategory.map((el, index) => {
                              return (
                                  <option value={el.value} key={el.value + index}>{el.label}</option>
                              )
                          })
                      }
                  </select>

                  <label htmlFor='productImage' className='mt-3'>Product Image :</label>
                  <label htmlFor='uploadImageInput'>
                      <div className='p-2 bg-slate-100 border rounded h-36 w-full flex justify-center items-center cursor-pointer'>

                          <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                              <span className='text-4xl'><ImFolderUpload /></span>
                              <p className='text-sm'>Upload Product Image</p>
                              <input type='file' id='uploadImageInput' className='hidden' onChange={handleUploadProduct} />
                          </div>
                      </div>
                  </label>
                  <div>
                      {
                          data?.productImage[0] ? (
                              <div className='flex items-center gap-2'>
                                  {
                                      data.productImage.map((el, index) => {
                                          return (
                                              <div className='relative group'>
                                                  <img src={el}
                                                      alt={el}
                                                      width={100}
                                                      height={100}
                                                      className='bg-slate-100 border cursor-pointer'
                                                      onClick={() => {
                                                          setOpenFullScreenImage(true)
                                                          setFullScreenImage(el)
                                                      }} />
                                                  <div className='absolute bottom-0 right-0 p-1
                            text-white bg-red-600 rounded-full hidden 
                              group-hover:block cursor-pointer'
                                                      onClick={() => handleDeleteProductImage(index)}>
                                                      <MdDelete />
                                                  </div>
                                              </div>

                                          )
                                      })
                                  }
                              </div>
                          ) : (
                              <p className='text-red-700 text-xs'>*Please Upload Product Image</p>
                          )
                      }

                  </div>
                  <label htmlFor='price' className='mt-3'>Price :</label>
                  <input
                      type='number'
                      id='price'
                      placeholder='enter product price'
                      name='price'
                      value={data.price}
                      onChange={handleOnChange}
                      className='p-2 bg-slate-100 border rounded'
                      required
                  />

                  <label htmlFor='sellingPrice' className='mt-3'>Selling Price :</label>
                  <input
                      type='number'
                      id='sellingPriceg'
                      placeholder='enter product selling price'
                      name='sellingPrice'
                      value={data.sellingPrice}
                      onChange={handleOnChange}
                      className='p-2 bg-slate-100 border rounded'
                      required
                  />

                  <label htmlFor='description' className='mt-3'>Description :</label>
                  <textarea className='h-28 bg-slate-100 border resize-none p-1'
                      placeholder='enter product description'
                      rows={3}
                      onChange={handleOnChange}
                      name='description'
                  >

                  </textarea>

                  <button className='px-3 py-1 bg-blue-700 text-white mb-10 hover:bg-blue-900'> Update Product  </button>
              </form>



          </div>
          {/***Display Full Screen */}
          {
              OpenFullScreenImage && (
                  <DisplayImage onClose={() => setOpenFullScreenImage(false)} imgUrl={FullScreenImage} />
              )
          }
      </div>
  )
}

export default AdminEditProduct