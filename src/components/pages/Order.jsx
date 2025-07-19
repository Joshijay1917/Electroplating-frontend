import React, { useContext, useEffect, useState } from 'react'
import { FaClipboardList, FaPlus, FaUser } from 'react-icons/fa'
import "../setheight.css"
import { MdDelete } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { Store } from '../../Context/Store'
import { BiUser } from 'react-icons/bi'

const Order = () => {
    const data = useContext(Store)
    const [currentOrder, setcurrentOrder] = useState([])
    const [currentCus, setcurrentCus] = useState([])

    const changeStatus = (e, o) => {
        data.changeStatus(o._id, e.target.checked);
        //data.getorders()
        //e.target.checked = e.target.checked
        e.target.checked = JSON.parse(data.orders.find(order => order._id === o._id).status)
        console.log(JSON.parse(data.orders.find(order => order._id === o._id).status));
    }

    useEffect(() => {
        data.setcurrentPage("Order")
        const getOrders = async() => {
            setcurrentOrder(data.orders.filter(o =>
                data.customers.find(c => c._id === o.customerid)
            ));
            setcurrentCus(data.customers.filter(c => 
                data.orders.find(o => o.customerid === c._id)
            ))
        }
        getOrders();
        
    }, [data.orders])

    console.log("order:", currentOrder)

    return (
        <div className='setheight'>
            <div className='mx-5 flex items-center justify-between my-8 shadow-2xl border border-gray-400 rounded-2xl p-4'>
                <div className='flex items-center'>
                    <FaClipboardList className="text-xl text-blue-600 dark:text-blue-400 mr-3" />
                    <h2 className="text-xl font-semibold">All Orders</h2>
                </div>
                <Link to={'/addorder'}>
                    <FaPlus className="text-2xl p-1 rounded-sm bg-blue-500 text-white dark:text-white mr-3" />
                </Link>
            </div>

            {currentOrder.length !== 0
                ? <div className='mx-5 my-8 shadow-2xl rounded-2xl'>
                    {/* <div className='flex text-lg dark:text-white items-center justify-between w-[93%] mx-auto'>
                        <span>Status</span>
                        <div className='flex p-3 justify-center w-[80%] '>
                            <span className='w-[50%]'>Customer</span>
                            <span>ItemName</span>
                        </div>
                        <span>Action</span>
                    </div> */}

                    {currentCus.length !== 0
                          ? currentCus.map(c => {
                            return <div key={c._id} className='mx-2 flex flex-col my-3 shadow-2xl border border-gray-400 rounded-2xl p-3'>
                            <div className='flex items-center'>
                                <FaUser className="text-lg text-blue-600 dark:text-blue-400 mr-3" />
                                <h2 className="text-lg font-medium">{c.name}</h2>
                            </div>
                            {/* <hr className='my-3 border border-blue-400'/> */}
                            {currentOrder.filter(o => o.customerid === c._id).map(o => {
                                return <div className={`rounded-xl flex justify-between items-center px-5 mt-3 relative overflow-hidden shadow-gray-500 transition-all hover:-translate-y-0.5 hover:shadow-lg dark:text-white dark:bg-gray-700 dark:border-gray-600 bg-gray-50 border-gray-400 border`}>
                                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700"></div>
                                <input type="checkbox" checked={JSON.parse(o.status)} onChange={(e) => changeStatus(e, o)} />
                                <Link className='flex p-3 justify-center w-[80%]' to={`/orderdetails/${o._id}`}>
                                    {/* <span className='name w-[50%] overflow-clip'>{o.customer}</span> */}
                                    <span className='itemName overflow-clip'>{o.itemName}</span>
                                </Link>
                                <MdDelete onClick={e => data.deleteCustomer(o._id, "order")} className='text-2xl text-blue-600 dark:text-blue-400' />
                            </div>
                            })}
                        </div>
                          })
                          :<div className='flex justify-center items-center'>
                          <BiUser className="text-6xl text-blue-600 dark:text-blue-400 mr-3"/>
                          <div>
                          <h1 className='text-2xl font-bold dark:text-white'>No Customers</h1>
                          <button onClick={()=>toggleForm()} className='flex bg-blue-500 rounded-2xl p-1 px-3'>Add Customer <FaPlus className="text-2xl p-1 rounded-sm bg-blue-500 text-white dark:text-white mr-3"/></button>
                          </div>
                        </div>
                        }

                    {/* {data.orders.map(o => {
                        return <div key={o._id} className={`rounded-xl flex justify-between items-center px-8 mx-3 my-3 relative overflow-hidden shadow-gray-500 transition-all hover:-translate-y-0.5 hover:shadow-lg dark:text-white dark:bg-gray-700 dark:border-gray-600 bg-gray-50 border-gray-400 border`}>
                                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700"></div>
                                <input type="checkbox" checked={JSON.parse(o.status)} onChange={(e)=>changeStatus(e)} />
                                <Link className='flex p-3 justify-center w-[80%]' to={`/orderdetails/${o._id}`}>
                                    <span className='name w-[50%] overflow-clip'>{o.customer}</span>
                                    <span className='itemName overflow-clip'>{o.itemName}</span>
                                </Link>
                                <MdDelete onClick={e=>data.deleteCustomer(o._id, "order")} className='text-2xl text-blue-600 dark:text-blue-400' />
                            </div>
                    })} */}
                </div>

                : <div className='flex justify-center items-center m-8'>
                    <BiUser className="text-6xl text-blue-600 dark:text-blue-400 mr-3" />
                    <div>
                        <h1 className='text-2xl font-bold'>No Orders</h1>
                        <Link to={'/addorder'} className='flex bg-blue-500 rounded-2xl p-1 px-3'>Add Order <FaPlus className="text-2xl p-1 rounded-sm bg-blue-500 text-white mr-3" /></Link>
                    </div>
                </div>}
        </div>
    )
}

export default Order
