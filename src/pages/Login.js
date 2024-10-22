import React, { useContext, useState } from 'react';
import loginIcons from '../assest/signin.gif';
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();
  const { fetchUserDetails, fetchUserAddToCart } = useContext(Context);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataRes = await fetch(SummaryApi.signIN.url, {
      method: SummaryApi.signIN.method,
      credentials: 'include',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const dataApi = await dataRes.json();
    if (dataApi.success) {
      toast.success(dataApi.message);
      navigate("/");
      fetchUserDetails();
      fetchUserAddToCart();
    } else if (dataApi.error) {
      toast.error(dataApi.message);
    }
  };

  return (
    <section id='login' className='bg-gray-100 min-h-screen flex items-center justify-center'>
      <div className='bg-white shadow-lg rounded-lg p-8 w-full max-w-sm mx-auto'>
        <div className='w-20 h-20 mx-auto'>
          <img src={loginIcons} alt='login icon' className='rounded-full shadow-md' />
        </div>

        <form className='pt-6 flex flex-col gap-4' onSubmit={handleSubmit}>
          <div className='grid'>
            <label className='font-semibold text-gray-700'>Email:</label>
            <div className='bg-gray-100 border border-gray-300 rounded-lg p-3 shadow-sm'>
              <input
                type='email'
                placeholder='Enter your email'
                name='email'
                value={data.email}
                onChange={handleOnChange}
                className='w-full h-full outline-none bg-transparent text-gray-700'
              />
            </div>
          </div>

          <div>
            <label className='font-semibold text-gray-700'>Password:</label>
            <div className='bg-gray-100 border border-gray-300 rounded-lg p-3 flex shadow-sm'>
              <input
                type={showPassword ? "text" : "password"}
                placeholder='Enter your password'
                name='password'
                value={data.password}
                onChange={handleOnChange}
                className='w-full h-full outline-none bg-transparent text-gray-700'
              />
              <div className='cursor-pointer text-xl text-gray-600 ml-2' onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </div>
            </div>
            <Link to='/forgot-password' className='block w-fit ml-auto text-blue-500 hover:underline text-sm mt-2'>
              Forgot password?
            </Link>
          </div>

          <button className='bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-105 transition-all mx-auto mt-6'>
            Login
          </button>
        </form>

        <p className='my-5 text-center text-gray-700'>
          Don't have an account?{' '}
          <Link to='/sign-up' className='text-blue-500 hover:underline'>
            Sign-up
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
