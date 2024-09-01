import React, { useState } from 'react'
import loginIcons from '../assest/signin.gif'
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { Link } from 'react-router-dom';
import imageTobase64 from '../helpers/imageTobase64';

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [data, setData] = useState(
        {
            email: "",
            password: "",
            name: "",
            confirmPassword: "",
            profilePic: ""
        }
    )
    const handleOnChange = (e) => {
        const { name, value } = e.target
        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const handleUploadPic =async(e) => {
        const file = e.target.files[0]
        const imagePic = await imageTobase64(file)

        setData((preve)=>{
            return{
                ...preve,
                profilePic :imagePic
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }
    console.log("data login", data)
    return (
        <section id='signup'>
            <div className='mx-auto container p-4'>
                <div className='bg-white p-5 w-full max-w-sm mx-auto'>
                    <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
                        <div>
                            <img src={data.profilePic || loginIcons} alt='login icons' />
                        </div>
                        <form>
                            <label>
                                <div className='text-xs bg-opacity-70 pb-4 pt-2 bg-slate-200 cursor-pointer py-3 text-center absolute bottom-0 w-full'>
                                    Upload Photo
                                </div>
                                <input type='file' className='hidden' onChange={handleUploadPic}/>
                            </label>
                        </form>
                    </div>
                    <form className='pt-5 flex flex-col gap-2' onSubmit={handleSubmit}>

                        <div className='grid'>
                            <label>Name :</label>
                            <div className='bg-slate-200 p-2'>
                                <input type='text' placeholder='enter your name' required
                                    name='name' value={data.name} onChange={handleOnChange}
                                    className='w-full h-full outline-none bg-transparent' />
                            </div>
                        </div>
                        <div className='grid'>
                            <label>Email :</label>
                            <div className='bg-slate-200 p-2'>
                                <input type='email' placeholder='enter email' required
                                    name='email' value={data.email} onChange={handleOnChange}
                                    className='w-full h-full outline-none bg-transparent' />
                            </div>
                        </div>

                        <div>
                            <label>Password :</label>
                            <div className='bg-slate-200 p-2 flex'>
                                <input type={showPassword ? "text" : "password"} placeholder='enter password' required
                                    name='password' value={data.password} onChange={handleOnChange}
                                    className='w-full h-full outline-none bg-transparent' />
                                <div className='cursor-pointer text-xl' onClick={() => setShowPassword((preve) => !preve)}>
                                    <span>
                                        {
                                            showPassword ? (
                                                <FiEyeOff />
                                            )
                                                :
                                                (
                                                    <FiEye />
                                                )
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label>Confirm Password :</label>
                            <div className='bg-slate-200 p-2 flex'>
                                <input type={showConfirmPassword ? "text" : "password"} placeholder='enter confirm password' required
                                    name='confirmPassword' value={data.confirmPassword} onChange={handleOnChange}
                                    className='w-full h-full outline-none bg-transparent' />
                                <div className='cursor-pointer text-xl' onClick={() => setShowConfirmPassword((preve) => !preve)}>
                                    <span>
                                        {
                                            showConfirmPassword ? (
                                                <FiEyeOff />
                                            )
                                                :
                                                (
                                                    <FiEye />
                                                )
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>

                        <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition mx-auto block mt-6'>
                            Sign Up</button>
                    </form>

                    <p className='my-5'>Already have an account ? <Link to={"/login"} className='hover:text-red-600 hover:underline'>Login</Link></p>

                </div>
            </div>
        </section>
    )
}

export default SignUp