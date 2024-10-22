import React, { useContext, useEffect, useState } from 'react';
import SummaryApi from '../common';
import Context from '../context';
import displayBDCurrency from '../helpers/displayCurrency';
import { MdDeleteSweep } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const loadingCart = new Array(context.cartProductCount).fill(null);

  const fetchData = async () => {
    const response = await fetch(SummaryApi.addToCartViewProduct.url, {
      method: SummaryApi.addToCartViewProduct.method,
      credentials: 'include',
      headers: {
        "content-type": "application/json"
      }
    });

    const responseData = await response.json();
    if (responseData.success) {
      context.setCartData(responseData.data);
    }
  };

  useEffect(() => {
    const handleLoading = async () => {
      setLoading(true);
      await fetchData();
      setLoading(false);
    };
    handleLoading();
  }, []);

  const incQ = async (id, q) => {
    const response = await fetch(SummaryApi.updateCartProduct.url, {
      method: SummaryApi.updateCartProduct.method,
      credentials: 'include',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        _id: id,
        quantity: q + 1
      })
    });

    const responseData = await response.json();
    if (responseData.success) {
      fetchData();
    }
  };

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
      });

      const responseData = await response.json();
      if (responseData.success) {
        fetchData();
      }
    }
  };

  const deleteCartProduct = async (id) => {
    const response = await fetch(SummaryApi.deleteCartProduct.url, {
      method: SummaryApi.deleteCartProduct.method,
      credentials: 'include',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        _id: id,
      })
    });

    const responseData = await response.json();
    if (responseData.success) {
      fetchData();
      context.fetchUserAddToCart();
    }
  };

  const totalQ = context.cartData?.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0);
  const totalprize = context.cartData?.reduce((preve, curr) => preve + (curr.quantity * curr?.productId?.sellingPrice), 0);

  // Use effect for back button navigation
  useEffect(() => {
    const handleBackButton = (event) => {
      if (event.key === 'Backspace') { // You can choose any key; here it's Backspace for demonstration
        event.preventDefault(); // Prevent the default backspace behavior
        navigate(-1); // Navigate to the previous page
      }
    };

    window.addEventListener('keydown', handleBackButton);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleBackButton);
    };
  }, [navigate]);

  return (
    <div className='container mx-auto'>
      <h1 className='text-2xl font-bold text-center my-6'>Your Shopping Cart</h1>
      <div className='text-center text-lg my-3'>
        {
          context.cartData?.length === 0 && !loading && (
            <p className='bg-off-white py-5 text-gray-500'>Your cart is empty!</p>
          )
        }
      </div>
      <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>
        {/*** View Product In User Cart */}
        <div className='w-full max-w-3xl'>
          {
            loading ? (
              loadingCart.map((el, index) => (
                <div className='w-full bg-creamy h-32 my-2 border border-gray-300 animate-pulse rounded-lg' key={el + "Add To Cart Loading" + index}></div>
              ))
            ) : (
              context.cartData?.map((product) => (
                <div className='w-full bg-off-white h-auto my-2 border border-gray-300 rounded-lg shadow-md flex items-center p-4' key={product?._id}>
                  <div className='w-32 h-32 bg-gray-200 rounded-l-lg flex items-center justify-center'>
                    <img src={product?.productId?.productImage[0]} className='w-full h-full object-contain' alt='' />
                  </div>
                  <div className='relative flex flex-col justify-between w-full pl-4'>
                    <div className='flex justify-between items-start'>
                      <h2 className='text-lg lg:text-xl font-semibold text-gray-800 line-clamp-2'>{product?.productId?.productName}</h2>
                      <MdDeleteSweep className='text-2xl cursor-pointer text-red-500 hover:text-red-700' onClick={() => deleteCartProduct(product?._id)} />
                    </div>
                    <p className='capitalize text-gray-500'>{product?.productId?.category}</p>
                    <div className='flex justify-between items-center'>
                      <p className='font-medium text-lg text-gray-800'>{displayBDCurrency(product?.productId?.sellingPrice)}</p>
                      <p className='font-medium text-lg text-gray-900'>Total: {displayBDCurrency(product?.productId?.sellingPrice * product?.quantity)}</p>
                    </div>
                    <div className='flex justify-center items-center mt-4 border-t border-gray-300 pt-2'>
                      <div className='flex items-center justify-center gap-2'>
                        <button className='rounded-md  bg-gray-400 border border-gray-300 text-white w-10 h-10 flex justify-center items-center hover:bg-gray-500 transition-colors' onClick={() => decQ(product?._id, product?.quantity)}>-</button>
                        <span className='text-lg'>{product?.quantity}</span>
                        <button className='rounded-md  bg-gray-400 border border-gray-300 text-white w-10 h-10 flex justify-center items-center hover:bg-gray-500 transition-colors' onClick={() => incQ(product?._id, product?.quantity)}>+</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )
          }
        </div>
        {/*** Total Product */}
        <div className='mt-5 lg:mt-0 w-full max-w-sm'>
          {
            loading ? (
              <div className='h-36 bg-gray-200 border border-gray-200 animate-pulse'></div>
            ) : (
              <div className='h-36 bg-off-white rounded-lg shadow-md'>
                <h2 className='text-white bg-gray-700 px-4 py-2 rounded-t-lg text-center'>Summary</h2>
                <div className='flex justify-between px-4 py-2'>
                  <p className='text-sm font-semibold'>Quantity:</p>
                  <p className='text-sm font-semibold'>{totalQ}</p>
                </div>
                <div className='flex justify-between px-4 py-2'>
                  <p className='text-sm font-semibold'>Total Price:</p>
                  <p className='text-sm font-semibold'>{displayBDCurrency(totalprize)}</p>
                </div>
                <div className='flex justify-center'>
                  <button
                    className='rounded-md bg-gray-600 hover:bg-gray-700 transition-colors text-white p-3 w-full mt-3'
                    onClick={() => navigate('/purchase')} // Ensure this line is included
                  >
                    Proceed to Payment
                  </button>
                </div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Cart;