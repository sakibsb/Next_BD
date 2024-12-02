import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FaCircleUser } from 'react-icons/fa6';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ROLE from '../common/role';

const AdminPanel = () => {
    const user = useSelector((state) => state?.user?.user);
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect to home if the user is not an admin
        if (user?.role !== ROLE.ADMIN) {
            navigate('/');
        }
    }, [user, navigate]);

    return (
        <div className="min-h-[calc(100vh-120px)] flex">
            {/* Sidebar */}
            <aside className="bg-white w-1/4 min-h-full shadow-lg">
                <div className="flex flex-col items-center py-6">
                    <div className="text-5xl mb-4">
                        {user?.profilePic ? (
                            <img
                                src={user?.profilePic}
                                alt={user?.name}
                                className="w-20 h-20 rounded-full"
                            />
                        ) : (
                            <FaCircleUser />
                        )}
                    </div>
                    <p className="text-lg font-semibold capitalize">
                        {user?.name || 'Admin'}
                    </p>
                    <p className="text-sm">{user?.role}</p>
                </div>
                <nav className="mt-4">
                    <Link
                        to="all-users"
                        className="block py-2 px-4 hover:bg-gray-200"
                    >
                        All Users
                    </Link>
                    <Link
                        to="products"
                        className="block py-2 px-4 hover:bg-gray-200"
                    >
                        Products
                    </Link>
                    <Link to={"all-orders"} className='px-2 py-1 hover:bg-slate-100'>All Orders</Link>
                    <Link
                        to="seller-requests"
                        className="block py-2 px-4 hover:bg-gray-200"
                    >
                        Seller Requests
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="w-3/4 p-6">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminPanel;