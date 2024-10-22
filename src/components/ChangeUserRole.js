import React, { useState } from 'react';
import ROLE from '../common/role';
import { IoCloseSharp } from "react-icons/io5";
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const ChangeUserRole = ({ name, email, role, userId, onClose, callFunc }) => {
    const [userRole, setUserRole] = useState(role);

    const handleOnChangeSelect = (e) => {
        setUserRole(e.target.value);
    }

    const updateUserRole = async () => {
        try {
            const fetchResponse = await fetch(SummaryApi.updateUser.url, {
                method: SummaryApi.updateUser.method,
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId: userId,
                    role: userRole
                })
            });

            const responseData = await fetchResponse.json();

            if (responseData.success) {
                toast.success(responseData.message);
                onClose();
                callFunc();
            } else {
                toast.error(responseData.message);
            }

            console.log("Role updated", responseData);
        } catch (error) {
            toast.error("Error updating user role.");
            console.error("Error:", error);
        }
    }

    return (
        <div className='fixed inset-0 flex justify-center items-center bg-slate-200 bg-opacity-45 z-50'>
            <div className='bg-white shadow-lg p-6 w-full max-w-sm rounded-lg'>
                <button className='absolute top-2 right-2 text-xl text-gray-500 hover:text-red-600' onClick={onClose}>
                    <IoCloseSharp />
                </button>
                <h1 className='text-lg font-semibold mb-4'>Change User Role</h1>
                <p className='mb-2'><strong>Name:</strong> {name}</p>
                <p className='mb-4'><strong>Email:</strong> {email}</p>

                <div className='flex items-center justify-between mb-4'>
                    <label htmlFor="role-select" className='font-medium'>Role</label>
                    <select
                        id="role-select"
                        className='border rounded px-4 py-1 focus:outline-none focus:ring focus:ring-blue-300'
                        value={userRole}
                        onChange={handleOnChangeSelect}
                    >
                        {Object.values(ROLE).map(el => (
                            <option value={el} key={el}>
                                {el}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    className='w-full py-2 bg-green-500 text-white hover:bg-green-600 rounded-full transition duration-200'
                    onClick={updateUserRole}
                >
                    Change Role
                </button>
            </div>
        </div>
    );
}

export default ChangeUserRole;