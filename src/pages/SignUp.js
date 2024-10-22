import React, { useState } from 'react';
import loginIcons from '../assest/signin.gif';
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from 'react-router-dom';
import imageTobase64 from '../helpers/imageTobase64';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: "",
        name: "",
        confirmPassword: "",
        profilePic: ""
    });

    const navigate = useNavigate();

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUploadPic = async (e) => {
        const file = e.target.files[0];
        const imagePic = await imageTobase64(file);
        setData((prev) => ({
            ...prev,
            profilePic: imagePic
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (data.password === data.confirmPassword) {
            const dataRes = await fetch(SummaryApi.signUP.url, {
                method: SummaryApi.signUP.method,
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const dataApi = await dataRes.json();
            if (dataApi.success) {
                toast.success(dataApi.message);
                navigate("/login");
            } else if (dataApi.error) {
                toast.error(dataApi.message);
            }
        } else {
            toast.error("Passwords do not match");
        }
    };

    return (
        <section id='signup' className='bg-gray-100 min-h-screen flex items-center justify-center'>
            <div className='bg-white shadow-lg rounded-lg p-8 w-full max-w-sm mx-auto'>
                <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
                    <div>
                        <img src={data.profilePic || loginIcons} alt='Profile' className='w-full h-full object-cover rounded-full' />
                    </div>
                    <form>
                        <label>
                            <div className='text-xs bg-opacity-70 pb-4 pt-2 bg-slate-200 cursor-pointer py-3 text-center absolute bottom-0 w-full rounded-full shadow-md'>
                                Upload Photo
                            </div>
                            <input type='file' className='hidden' onChange={handleUploadPic} />
                        </label>
                    </form>
                </div>
                <form className='pt-5 flex flex-col gap-4' onSubmit={handleSubmit}>
                    <div className='grid'>
                        <label className='font-semibold text-gray-700'>Name:</label>
                        <div className='bg-gray-100 border border-gray-300 rounded-lg p-2'>
                            <input
                                type='text'
                                placeholder='Enter your name'
                                required
                                name='name'
                                value={data.name}
                                onChange={handleOnChange}
                                className='w-full h-full outline-none bg-transparent text-gray-700'
                            />
                        </div>
                    </div>
                    <div className='grid'>
                        <label className='font-semibold text-gray-700'>Email:</label>
                        <div className='bg-gray-100 border border-gray-300 rounded-lg p-2'>
                            <input
                                type='email'
                                placeholder='Enter email'
                                required
                                name='email'
                                value={data.email}
                                onChange={handleOnChange}
                                className='w-full h-full outline-none bg-transparent text-gray-700'
                            />
                        </div>
                    </div>
                    <div>
                        <label className='font-semibold text-gray-700'>Password:</label>
                        <div className='bg-gray-100 border border-gray-300 rounded-lg p-2 flex'>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder='Enter password'
                                required
                                name='password'
                                value={data.password}
                                onChange={handleOnChange}
                                className='w-full h-full outline-none bg-transparent text-gray-700'
                            />
                            <div className='cursor-pointer text-xl text-gray-600 ml-2' onClick={() => setShowPassword(prev => !prev)}>
                                {showPassword ? <FiEyeOff /> : <FiEye />}
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className='font-semibold text-gray-700'>Confirm Password:</label>
                        <div className='bg-gray-100 border border-gray-300 rounded-lg p-2 flex'>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder='Confirm password'
                                required
                                name='confirmPassword'
                                value={data.confirmPassword}
                                onChange={handleOnChange}
                                className='w-full h-full outline-none bg-transparent text-gray-700'
                            />
                            <div className='cursor-pointer text-xl text-gray-600 ml-2' onClick={() => setShowConfirmPassword(prev => !prev)}>
                                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                            </div>
                        </div>
                    </div>
                    <button className='bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 w-full rounded-full transition-transform transform hover:scale-105 mx-auto mt-6'>
                        Sign Up
                    </button>
                </form>
                <p className='my-5 text-center text-gray-700'>
                    Already have an account? <Link to="/login" className='text-blue-500 hover:underline'>Login</Link>
                </p>
            </div>
        </section>
    );
};

export default SignUp;
