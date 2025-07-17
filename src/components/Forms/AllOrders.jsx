import React, { useState, useEffect, useContext } from 'react'
import { FaList, FaPlus, FaUser } from 'react-icons/fa'
import { Store } from '../../Context/Store'
import { Link } from 'react-router-dom'

const AllOrders = () => {
    const data = useContext(Store)
    const [orders, setorders] = useState([])
    const [customer, setcustomer] = useState({
        customer: '',
        customerid: ''
    })

    const CustomerDetailes = async(customer, event) => {
        setcustomer(prev => ({
            ...prev,
            customer: customer.name,
            customerid: customer._id
        }))
    }

    useEffect(() => {
        if (customer.customer === '') {
            data.currentCustomerOrder(customer.customerid)
        }
        
    }, [customer])
    
    console.log("customer",customer);


    return (
        <div>
            {customer.customer === ''
                ? <div className='mx-3 flex flex-col my-8 shadow-2xl border border-gray-400 rounded-2xl p-4'>
                    <div className='flex items-center p-2'>
                        <FaUser className="text-xl text-blue-600 dark:text-blue-400 mr-3" />
                        <h2 className="text-xl font-semibold dark:text-gray-300">Select Customer</h2>
                    </div>
                    <hr className='my-3 border border-blue-400' />

                    <div>
                        {data.customers.map(c => {
                            return <div key={c._id} onClick={(e) => CustomerDetailes(c, e)} className={`rounded-xl flex justify-between items-center p-3 px-8 my-3 relative overflow-hidden shadow-gray-500 transition-all hover:-translate-y-0.5 hover:shadow-lg dark:text-white dark:bg-gray-700 dark:border-gray-600 bg-gray-50 border-gray-400 border`}>
                                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700"></div>
                                <div className='flex justify-between gap-6 w-[80%]'>
                                    <span className='name'>{c.name}</span>
                                    <span className='phone'>{c.phone}</span>
                                </div>
                            </div>
                        })}
                    </div>

                </div>
                : <div className='mx-3 flex flex-col my-8 shadow-2xl border border-gray-400 rounded-2xl p-4'>
                    <div className='flex items-center p-2'>
                        <FaUser className="text-xl text-blue-600 dark:text-blue-400 mr-3" />
                        <h2 className="text-xl font-semibold dark:text-gray-300">{customer.customer}'s orders</h2>
                    </div>
                    <hr className='my-3 border border-blue-400' />

                    {data.currcusorder.length !== 0
                        ? <div> {data.currcusorder.map(o => {
                            return <Link key={o._id} to={`/orderdetails/${o._id}`}> <div className={`rounded-xl flex justify-between items-center p-3 px-8 my-3 relative overflow-hidden shadow-gray-500 transition-all hover:-translate-y-0.5 hover:shadow-lg dark:text-white dark:bg-gray-700 dark:border-gray-600 bg-gray-50 border-gray-400 border`}>
                                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700"></div>
                                <div className='flex justify-between gap-6 w-[80%]'>
                                    <span className='name'>{o.customer}</span>
                                    <span className='phone'>{o.itemName}</span>
                                </div>
                            </div></Link>
                        })}
                        <Link to={`/orderform/${customer.customerid}`} className='flex w-fit mx-auto bg-blue-500 text-white rounded-2xl p-1 px-3'>Add Order <FaPlus className="text-2xl p-1 rounded-sm bg-blue-500 text-white dark:text-white mr-3" /></Link>
                        </div>
                        : <div className='flex justify-center items-center m-8'>
                            <FaList className="text-6xl text-blue-600 dark:text-blue-400 mr-3" />
                            <div>
                                <h1 className='text-2xl font-bold dark:text-white'>No Orders</h1>
                                <Link to={`/orderform/${customer.customerid}`} className='flex bg-blue-500 text-white rounded-2xl p-1 px-3'>Add Order <FaPlus className="text-2xl p-1 rounded-sm bg-blue-500 text-white dark:text-white mr-3" /></Link>
                            </div>
                        </div>}
                </div>}
        </div>
    )
}

export default AllOrders
