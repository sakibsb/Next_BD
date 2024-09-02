import React, { useContext, useEffect, useState } from 'react'
import SummaryApi from '../common'
import Context from '../context'
import displayBDCurrency from '../helpers/displayCurrency'
import { MdDeleteSweep } from "react-icons/md";

const Cart = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const context = useContext(Context)
  const loadingCart = new Array(context.cartProductCount).fill(null)

  const fetchData = async () => {
    const response = await fetch(SummaryApi.addToCartViewProduct.url, {
      method: SummaryApi.addToCartViewProduct.method,
      credentials: 'include',
      headers: {
        "content-type": "application/json"
      }
    })
  
    const responseData = await response.json()

    if (responseData.success) {
      setData(responseData.data)
    }
  }

  const handleLoading =async()=>{
    await fetchData()
  }
  useEffect(() => {
    setLoading(true)
    handleLoading()
    setLoading(false)
  }, [])

  const incQ = async (id, q) => {
    const response = await fetch(SummaryApi.updateCartProduct.url, {
      method: SummaryApi.updateCartProduct.method,
      credentials: 'include',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        _id : id ,
        quantity: q + 1
      })
    })

    const responseData = await response.json()

    if (responseData.success) {
      fetchData()
    }

  }

  const decQ = async (id, q) => {
    if (q > 1) {
      const response = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        credentials: 'include',
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          _id: id,
          quantity: q - 1
        })
      })

      const responseData = await response.json()

      if (responseData.success) {
        fetchData()
      }
    }
  }
  const deleteCartProduct = async(id)=>{
    const response = await fetch(SummaryApi.deleteCartProduct.url, {
      method: SummaryApi.deleteCartProduct.method,
      credentials: 'include',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        _id: id,
      })
    })

    const responseData = await response.json()

    if (responseData.success) {
      fetchData()
      context.fetchUserAddToCart()
    }
  }

  const totalQ = data.reduce((previousValue, currentValue) => previousValue + currentValue.quantity , 0)

  const totalprize = data.reduce((preve, curr) => preve + (curr.quantity * curr?.productId?.sellingPrice) , 0)
  return (
    <div className='container mx-auto'>
      <div className=' text-center text-lg my-3'>
        {
          data.length === 0 && !loading && (
            <p className='bg-white py-5'>No Information</p>
          )
        }
      </div>
      <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>
        {/***View Product In User Cart */}
        <div className='w-full max-w-3xl'>
          {
            loading ? (
              loadingCart.map((el,index) => {
                return (
                  <div className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded' key={el + "Add To Cart Loading"+index}>

                  </div>
                )
              })
            ) : (
              data.map((product, index) => {
                return (
                  <div className='w-full bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]' key={product?._id + "Add To Cart Loading"}>
                    <div className='w-32 h-32 bg-slate-200'>
                      <img src={product?.productId?.productImage[0]} className='w-full h-full object-scale-down mix-blend-multiply' alt='' />
                    </div>
                    {/***Delete Product */}
                    <div className='relative'>
                      <div className='absolute right-0 p-1 hover:rounded-full hover:bg-blue-700 hover:text-white cursor-pointer' onClick={() => deleteCartProduct(product?._id)}>
                        <MdDeleteSweep className='text-3xl'/>
                      </div>
                      <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1 px-5'>{product?.productId?.productName}</h2>
                      <p className='capitalize text-slate-500 px-5'>{product?.productId?.category}</p>
                      <div className='flex justify-between items-center'>
                        <p className='px-5 font-medium text-lg text-blue-900'>{displayBDCurrency(product?.productId?.sellingPrice)}</p>
                        <p className='px-5 font-medium text-lg text-blue-900'>Total :{displayBDCurrency(product?.productId?.sellingPrice * product?.quantity)}</p>
                      </div>
                      <div className='flex  items-center px-5 py-2 gap-3 '>
                        <button className=' bg-blue-700 text-white border border-black w-28 h-8 flex justify-center items-center hover:bg-white hover:text-blue-800 cursor-pointer font-semibold ' onClick={() => decQ(product?._id, product?.quantity)}>-</button>
                        <span>{product?.quantity}</span>
                        <button className=' bg-blue-700 text-white border border-black w-28 h-8  flex justify-center items-center hover:bg-white hover:text-blue-800 cursor-pointer font-semibold' onClick={() => incQ(product?._id, product?.quantity)}>+</button>
                      </div>
                    </div>
                  </div>
                )
              })
            )
          }
        </div>
        {/***Total Product */}
        <div className='mt-5 lg-mt-0 w-full max-w-sm'>
          {
            loading ? (
              <div className='h-36 bg-slate-200 border border-slate-200 animate-pulse'>

              </div>
            ) : (
              <div>
                <div className='h-36 bg-white'>
                  <h2 className='text-white bg-black px-4 py-2'>Summary </h2>
                  <div className='flex px-4 gap-3'>
                    <p className='text-sm font-semibold'>Quantity : </p>
                    <p className='text-sm font-semibold'>{totalQ}</p>
                  </div>
                    <div className='flex px-4 gap-3'>
                      <p className='text-sm font-semibold'>Total Prize :</p>
                      <p className='text-sm font-semibold'>{displayBDCurrency(totalprize)}</p>
                  </div>
                  <button className='bg-blue-700 p-2 text-white w-full'>Payment</button>
                </div>
              </div>
            )
          }
        </div>

      </div>
    </div>
  )
}

export default Cart