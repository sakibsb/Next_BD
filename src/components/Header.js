import React, { useContext, useState } from 'react';
import Logo from './Logo';
import { FaSearch } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';

const Header = () => {
  const user = useSelector(state => state?.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const context = useContext(Context);
  const navigate = useNavigate();
  const searchInput = useLocation();
  const searchURL = new URLSearchParams(searchInput?.search);
  const searchQuery = searchURL.getAll("q");
  const [search, setSearch] = useState(searchQuery);

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: 'include',
    });

    const data = await fetchData.json();
    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/");
    } else if (data.error) {
      toast.error(data.message);
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate("/search");
    }
  };

  return (
    <header className="h-16 shadow-md bg-gradient-to-r from-blue-700 to-blue-500 fixed w-full z-40">
      <div className="container mx-auto flex items-center justify-between px-6">
        {/* Logo Section */}
        <Link to={"/"}>
          <Logo w={100} h={60} />
        </Link>

        {/* Search Bar */}
        <div className="hidden lg:flex items-center w-full justify-between max-w-md border border-blue-900 rounded-full shadow-lg pl-3 bg-[#FAFAFA]">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full outline-none pl-2 text-gray-700 bg-transparent"
            onChange={handleSearch}
            value={search}
          />
          <div className="text-lg min-w-[50px] h-10 bg-blue-600 text-white flex items-center justify-center rounded-r-full hover:bg-blue-700 transition duration-300">
            <FaSearch />
          </div>
        </div>

        {/* User and Cart Icons */}
        <div className="flex items-center gap-6">
          {/* User Profile */}
          <div className="relative flex items-center">
            {user?._id && (
              <div
                className="text-3xl cursor-pointer"
                onClick={() => setMenuDisplay(prev => !prev)}
              >
                {user?.profilePic ? (
                  <img
                    src={user?.profilePic}
                    className="w-10 h-10 rounded-full border-2 border-white shadow-lg"
                    alt={user?.name}
                  />
                ) : (
                  <FaCircleUser className="text-white" />
                )}
              </div>
            )}
            {menuDisplay && (
              <div className="absolute bg-white right-0 top-12 p-4 shadow-lg rounded-md w-40 z-50">
                <nav>
                  {user?.role === ROLE.ADMIN && (
                    <Link
                      to={"/admin-panel/products"}
                      className="block text-gray-700 hover:bg-gray-200 p-2 rounded-md"
                      onClick={() => setMenuDisplay(false)}
                    >
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left text-red-600 hover:bg-red-100 p-2 rounded-md"
                  >
                    Logout
                  </button>
                </nav>
              </div>
            )}
          </div>

          {/* Cart Icon */}
          {user?._id && (
            <Link to={"/cart"} className="relative text-white text-3xl">
              <AiOutlineShoppingCart />
              <div className="bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3">
                <p className="text-sm">{context?.cartProductCount}</p>
              </div>
            </Link>
          )}

          {/* Login/Logout Button */}
          <div>
            {user?._id ? (
              <button
                onClick={handleLogout}
                className="px-4 py-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition duration-300"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="px-4 py-1 bg-green-600 text-white rounded-full hover:bg-green-700 transition duration-300"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;