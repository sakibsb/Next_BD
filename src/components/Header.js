import React, { useContext, useState } from 'react'
import Logo from './Logo'
import { FaSearch } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice'
import ROLE from '../common/role';
import Context from '../context';

const Header = () => {
  const user = useSelector(state => state?.user?.user)
  const dispatch = useDispatch()

  const [menuDisplay, setMenuDisplay] = useState(false)
  const context = useContext(Context)
  const navigate = useNavigate()
  const searchInput = useLocation()
  const searchURL = new URLSearchParams(searchInput?.search)
  const searchQuery = searchURL.getAll("q")
  const [search ,setSearch] = useState(searchQuery)

  const handleLogout = async () => {

    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: 'include'
    })

    const data = await fetchData.json()
    if (data.success) {
      toast.success(data.message)
      dispatch(setUserDetails(null))
      navigate("/")
    }
    if (data.error) {
      toast.error(data.message)
    }
  }
  
  const handleSearch =(e)=>{
    const {value} = e.target
    setSearch(value)
    if(value){
      navigate(`/search?q=${value}`)
    }else{
      navigate("/search")
    }
  }
  return (
    <header className='h-16 shadow-md bg-white fixed w-full  z-40'>
      <div className='container mx-auto flex items-center justify-between'>
        <div className='px-8'>
          <Link to={"/"}>
            <Logo w={100} h={60} />
          </Link>
        </div>
        <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow-md pl-2 border-separate border-blue-900'>
          <input type='text' placeholder='search product here...' className='w-full outline-none pl-2' onChange={handleSearch} value={search}/>
          <div className='text-lg min-w-[50px] h-10 bg-white flex items-center justify-center rounded-r-full'>
            <FaSearch />
          </div>
        </div>
        <div className='flex items-center gap-12'>
          <div className='relative  flex justify-center'>
            {
              user?._id && (
                <div className='text-3xl cursor-pointer relative flex justify-center' onClick={() => setMenuDisplay(preve => !preve)}>
                  {
                    user?.profilePic ? (
                      <img src={user?.profilePic} className='w-10 h-10 rounded-full' alt={user?.name} />
                    ) : (
                      <FaCircleUser />
                    )
                  }
                </div>
              )
            }

            {
              menuDisplay && (
                <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded'>
                  <nav>
                    {
                      user?.role === ROLE.ADMIN && (
                        <Link to={"/admin-panel/products"} className='whitespace-nowrap hidden md:block hover:bg-slate-200 p-2' onClick={() => setMenuDisplay(preve => !preve)}>Admin Panel</Link>

                      )
                    }
                  </nav>

                </div>
              )
            }

          </div>
          {user?._id && (
            <Link to={"/cart"} className='text-3xl relative'>
              <span><AiOutlineShoppingCart /></span>
              <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
                <p className='text-sm'>{context?.cartProductCount}</p>
              </div>
            </Link>
          )
          }
          <div>
            {
              user?._id ? (
                <button onClick={handleLogout} className='px-3 bg-red-600 py-1 rounded-full text-white hover:bg-black'>Logout</button>
              )
                : (
                  <Link to={"login"} className='px-3 bg-red-600 py-1 rounded-full text-white hover:bg-black'>Login</Link>
                )
            }

          </div>
        </div>
      </div>
    </header>
  )
}

export default Header