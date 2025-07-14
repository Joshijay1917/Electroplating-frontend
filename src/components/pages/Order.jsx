import React, { useContext, useEffect } from 'react'
import { FaClipboardList, FaPlus } from 'react-icons/fa'
import "../setheight.css"
import { MdDelete } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { Store } from '../../Context/Store'
import { BiUser } from 'react-icons/bi'

const Order = () => {
    const data = useContext(Store)

    useEffect(() => {
        data.setcurrentPage("Order")
    }, [])

    return (
        <div className='setheight'>
            <div className='mx-5 flex items-center justify-between my-8 shadow-2xl border border-gray-400 rounded-2xl p-4'>
                <div className='flex items-center'>
                    <FaClipboardList className="text-xl text-blue-600 dark:text-blue-400 mr-3" />
                    <h2 className="text-xl font-semibold dark:text-white">All Orders</h2>
                </div>
                <Link to={'/addorder'}>
                    <FaPlus className="text-2xl p-1 rounded-sm bg-blue-500 text-white dark:text-white mr-3" />
                </Link>
            </div>

            {data.orders.length !== 0
                ? <div className='mx-5 my-8 shadow-2xl border border-gray-400 rounded-2xl'>
                    <div className='flex text-lg dark:text-white items-center justify-between w-[93%] mx-auto'>
                        <span>Status</span>
                        <div className='flex p-3 justify-center w-[80%] '>
                            <span className='w-[50%]'>Customer</span>
                            <span>ItemName</span>
                        </div>
                        <span>Action</span>
                    </div>

                    {data.orders.map(o => {
                        return <div key={o._id} className={`rounded-xl flex justify-between items-center px-8 mx-3 my-3 relative overflow-hidden shadow-gray-500 transition-all hover:-translate-y-0.5 hover:shadow-lg dark:text-white dark:bg-gray-700 dark:border-gray-600 bg-gray-50 border-gray-400 border`}>
                                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700"></div>
                                <input type="checkbox" checked={JSON.parse(o.status)} onChange={(e)=>data.changeStatus(o._id, e.target.checked)} />
                                <Link className='flex p-3 justify-center w-[80%]' to={`/orderdetails/${o._id}`}>
                                    <span className='name w-[50%] overflow-clip'>{o.customer}</span>
                                    <span className='itemName overflow-clip'>{o.itemName}</span>
                                </Link>
                                <MdDelete onClick={e=>data.deleteCustomer(o._id, "order")} className='text-2xl text-blue-600 dark:text-blue-400' />
                            </div>
                    })}
                </div>

                : <div className='flex justify-center items-center m-8'>
                    <BiUser className="text-6xl text-blue-600 dark:text-blue-400 mr-3" />
                    <div>
                        <h1 className='text-2xl font-bold dark:text-white'>No Orders</h1>
                        <Link to={'/addorder'} className='flex bg-blue-500 text-white rounded-2xl p-1 px-3'>Add Order <FaPlus className="text-2xl p-1 rounded-sm bg-blue-500 text-white dark:text-white mr-3" /></Link>
                    </div>
                </div>}
        </div>
    )
}

export default Order
