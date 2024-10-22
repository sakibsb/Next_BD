import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import Context from '../context';
import { toast } from 'react-toastify';
import axios from 'axios';
import SummaryApi from '../common';

const PurchasePage = () => {
    const { cartData } = useContext(Context);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (value) => {
        try {
            localStorage.setItem('checkout-form-data', JSON.stringify(value));

            const amount = cartData?.reduce((preve, curr) => preve + (curr.quantity * curr?.productId?.sellingPrice), 0);
            const productsName = cartData?.map(data => data?.productId?.productName);

            const info = { ...value, amount, productsName };

            const { data } = await axios.post(SummaryApi.getPlaymentLink.url, info, {
                withCredentials: 'include'
            });

            window.location.replace(data.url);
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
        }
    };

    return (
        <section className='container mx-auto p-6 w-full h-full flex justify-center items-center'>
            <div className='space-y-10 p-6 rounded-lg border bg-white lg:w-[50%] md:w-[65%] sm:w-[75%] w-full shadow-lg'>
                <h1 className='text-3xl font-bold text-center text-gray-800'>Checkout Form</h1>
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <div className='flex flex-col'>
                            <label htmlFor='firstName' className='font-medium text-gray-700'>First name</label>
                            <input id='firstName' {...register('firstName', { required: true })} placeholder='Enter your first name' className="py-2 px-4 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500" />
                            {errors.firstName && <small className='text-red-500'>First name is required</small>}
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor='lastName' className='font-medium text-gray-700'>Last name (optional)</label>
                            <input id='lastName' {...register('lastName')} placeholder='Enter your last name' className="py-2 px-4 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500" />
                        </div>
                    </div>

                    <div className='flex flex-col'>
                        <label htmlFor='email' className='font-medium text-gray-700'>Email</label>
                        <input type='email' id='email' {...register('email', { required: true })} placeholder='Enter your email' className="py-2 px-4 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500" />
                        {errors.email && <small className='text-red-500'>Email is required</small>}
                    </div>

                    <div className='flex flex-col'>
                        <label htmlFor='phone' className='font-medium text-gray-700'>Phone</label>
                        <input type='number' id='phone' {...register('phone', { required: true })} placeholder='Enter your phone number' className="py-2 px-4 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500" />
                        {errors.phone && <small className='text-red-500'>Phone number is required</small>}
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <div className='flex flex-col'>
                            <label htmlFor='address' className='font-medium text-gray-700'>Street Address</label>
                            <input id='address' {...register('address', { required: true })} placeholder='Enter your street address' className="py-2 px-4 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500" />
                            {errors.address && <small className='text-red-500'>Address is required</small>}
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor='city' className='font-medium text-gray-700'>City/Town</label>
                            <input id='city' {...register('city', { required: true })} placeholder='Enter your city' className="py-2 px-4 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500" />
                            {errors.city && <small className='text-red-500'>City/Town is required</small>}
                        </div>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <div className='flex flex-col'>
                            <label htmlFor='state' className='font-medium text-gray-700'>State/Province/Region</label>
                            <input id='state' {...register('state', { required: true })} placeholder='Enter your state/province/region' className="py-2 px-4 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500" />
                            {errors.state && <small className='text-red-500'>State/Province/Region is required</small>}
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor='postal' className='font-medium text-gray-700'>Postal/Zip Code</label>
                            <input id='postal' {...register('postal', { required: true })} placeholder='Enter your postal/zip code' className="py-2 px-4 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500" />
                            {errors.postal && <small className='text-red-500'>Postal/Zip Code is required</small>}
                        </div>
                    </div>

                    <div className='flex flex-col'>
                        <label htmlFor='country' className='font-medium text-gray-700'>Country</label>
                        <input id='country' {...register('country', { required: true })} placeholder='Enter your country' className="py-2 px-4 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500" />
                        {errors.country && <small className='text-red-500'>Country is required</small>}
                    </div>

                    <button type='submit' className='bg-green-500 hover:bg-green-600 transition-colors p-3 text-white w-full rounded-md'>
                        Pay
                    </button>
                </form>
            </div>
        </section>
    );
};

export default PurchasePage;
