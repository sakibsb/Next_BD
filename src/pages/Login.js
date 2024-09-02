import React, { useContext, useState } from 'react'
import loginIcons from '../assest/signin.gif'
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify'
import Context from '../context';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [data , setData] = useState(
    {
      email : "",
      password : ""
    }
  )
  const navigate = useNavigate()
  const { fetchUserDetails, fetchUserAddToCart } = useContext(Context)

  const handleOnChange =(e) =>{
    const{name , value} = e.target
    setData((preve)=>{
      return{
        ...preve,
        [name] :value
      }
    })
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()

    const dataRes = await fetch(SummaryApi.signIN.url, {
      method: SummaryApi.signIN.method,
      credentials: 'include',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(data)
    })

    const dataApi = await dataRes.json()

    if (dataApi.success) {
      toast.success(dataApi.message)
      navigate("/")
      fetchUserDetails()
      fetchUserAddToCart()
    }

    if (dataApi.error) {
      toast.error(dataApi.message)
    }
  }
  console.log("data login",data)
  return (
    <section id='login'>
      <div className='mx-auto container p-4'>
        <div className='bg-white p-5 w-full max-w-sm mx-auto'>
          <div className='w-20 h-20 mx-auto '>
            <img src={loginIcons} alt='login icons' />
          </div>
          <form className='pt-5 flex flex-col gap-2' onSubmit={handleSubmit}>
            <div className='grid'>
              <label>Email :</label>
              <div className='bg-slate-200 p-2'>
                <input type='email' placeholder='enter email'
                  name='email' value={data.email} onChange={handleOnChange} 
                  className='w-full h-full outline-none bg-transparent' />
              </div>
            </div>

            <div>
              <label>Password :</label>
              <div className='bg-slate-200 p-2 flex'>
                <input type={showPassword ? "text" : "password"} placeholder='enter password' 
                  name='password' value={data.password} onChange={handleOnChange} 
                className='w-full h-full outline-none bg-transparent' />
                <div className='cursor-pointer text-xl' onClick={() => setShowPassword((preve)=>!preve)}>
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
              <Link to={'/forgot-password'} className='block w-fit ml-auto hover:underline hover:text-red-600'>
                Forgot password ?
              </Link>
            </div>

            <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition mx-auto block mt-6'>Login</button>
          </form>

          <p className='my-5'>Don't have an account ? <Link to={"/sign-up"} className='hover:text-red-600 hover:underline'>Sign-up</Link></p>

        </div>
      </div>
    </section>
  )
}

export default Login