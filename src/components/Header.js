import React from 'react'
import Logo from './Logo'
import { FaSearch } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className='h-16 shadow-md bg-white'>
      <div className='container mx-auto flex items-center px-4 justify-between'>
        <div className=''>
          <Link to={"/"}>
            <Logo w={90} h={50} />
          </Link>
        </div>
        <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow-md pl-2'>
          <input type='text' placeholder='search product here...' className='w-full outline-none pl-2' />
          <div className='text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full '>
            <FaSearch />
          </div>
        </div>
        <div className='flex items-center gap-12'>
          <div className='text-3xl cursor-pointer'>
            <FaCircleUser />
          </div>
          <div className='text-3xl relative'>
            <span><AiOutlineShoppingCart /></span>
            <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
              <p className='text-sm'>0</p>
            </div>
          </div>
          <div>
            <Link to={"login"} className='px-3 bg-red-600 py-1 rounded-full text-white hover:bg-black'>Login</Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header