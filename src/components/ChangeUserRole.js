import React from 'react'
import ROLE from '../common/role'
import { IoCloseSharp } from "react-icons/io5";
import { useState } from 'react'
import SummaryApi from '../common'
import { toast } from 'react-toastify';

const ChangeUserRole = ({
    name,
    email,
    role,
    userId ,
    onClose,
    callFunc,
}) => {
    const [userRole, setUserRole] = useState(role)

    const handleOnChangeSelect = (e) => {
        setUserRole(e.target.value)
    }
    const updateUserRole = async () => {
        const fetchResponse = await fetch(SummaryApi.updateUser.url, {
            method: SummaryApi.updateUser.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                userId : userId ,
                role: userRole
            })
        })

        const responseData = await fetchResponse.json()

        if(responseData.success){
            toast.success(responseData.message)
            onClose()
            callFunc()
        }

        console.log("role updated", responseData)
    }
    return (
        <div className='fixed  top-fit bottom-fit right-auto left-20 w-full h-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-45'>
            <div className='mx-auto bg-white shadow-md p-4 w-full max-w-sm'>
                <button className='block ml-auto ' onClick=  {onClose}>
                    <IoCloseSharp />
                </button>
                <h1 className='pb-4 text-lg font-medium'>Change User Role</h1>
                <p>Name : {name} </p>
                <p>Email : {email} </p>

                <div className='flex items-center justify-between my-2'>
                    <p>Role</p>
                    <select className='border px-4 py-1' value={userRole} onChange={handleOnChangeSelect}>
                        {
                            Object.values(ROLE).map(el => {
                                return (
                                    <option value={el} key={el}>
                                        {el}
                                    </option>
                                )
                            })
                        }

                    </select>
                </div>
                <button className='w-fit mx-auto block py-2 px-3 bg-green-500 text-black hover:bg-green-700 rounded-full' onClick={updateUserRole}>
                    Change Role
                </button>
            </div>
        </div>
    )
}

export default ChangeUserRole