import React, { useContext, useEffect } from 'react'
import { Store } from '../../Context/Store'
import { FaUser } from 'react-icons/fa'
import { GiCancel } from 'react-icons/gi'
import { useNavigate, useParams } from 'react-router-dom'

const OrderDetailes = () => {
  const data = useContext(Store)
  const params = useParams();
  const naviagte = useNavigate();
  const order = data.orders.find(o => o._id == params.id)

  console.log("Order:", order);


  useEffect(() => {
    data.setcurrentPage("orderdetailes")
    console.log("parama:", params);

  }, [])

  return (
    <div className='setheight text-gray-700 dark:text-white p-6'>
      <h1 className='text-2xl font-bold underline underline-offset-10 decoration-7 decoration-blue-400'>Order Detailes</h1>

      <div className='mx-3 flex flex-col my-8 shadow-2xl border border-gray-400 rounded-2xl p-4'>
        <div className='flex items-center p-2 justify-between'>
          <div className='flex items-center'>
            <FaUser className="text-xl text-blue-600 dark:text-blue-400 mr-3" />
            <h2 className="text-xl font-semibold">{order.customer.toLocaleUpperCase()}</h2>
          </div>
          <GiCancel onClick={e => naviagte('/orders')} className='text-3xl text-blue-600 dark:text-blue-400' />
        </div>
        <hr className='mt-3 border border-blue-400'/>

        <div className={`flex pt-3 px-4 relative overflow-hidden dark:bg-gray-700 bg-gray-50`}>
          <div className='flex items-center justify-between gap-3 w-full'>
            <span className='itemname text-xl'>ItemName:</span>
            <span className='w-[70%] rounded-2xl text-xl p-2'>{order.itemName}</span>
          </div>
        </div>
        <div className={`flex px-4 relative overflow-hidden dark:bg-gray-700 bg-gray-50`}>
          <div className='flex items-center justify-between gap-3 w-full'>
            <span className='itemname text-xl'>Material:</span>
            <span className='w-[70%] rounded-2xl text-xl p-2'>{order.material}</span>
          </div>
        </div>
        <div className={`flex px-4 relative overflow-hidden dark:bg-gray-700 bg-gray-50`}>
          <div className='flex items-center justify-between gap-3 w-full'>
            <span className='itemname text-xl'>Date:</span>
            <span className='w-[70%] rounded-2xl text-xl p-2'>{new Date(order.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
        <div className={`flex px-4 relative overflow-hidden dark:bg-gray-700 bg-gray-50`}>
          <div className='flex items-center justify-between gap-3 w-full'>
            <span className='itemname text-xl'>Quntity:</span>
            <span className='w-[70%] rounded-2xl text-xl p-2'>{order.quantity}</span>
          </div>
        </div>
        <div className={`flex px-4 relative overflow-hidden dark:bg-gray-700 bg-gray-50`}>
          <div className='flex items-center justify-between gap-3 w-full'>
            <span className='itemname text-xl'>GST:</span>
            <span className='w-[70%] rounded-2xl text-xl p-2'>{(order.gst / order.baseCost) * 100}%</span>
          </div>
        </div>
        <div className='flex flex-col px-4 p-3 items-center justify-between gap-3 w-full'>
          <span className='mx-auto font-bold text-2xl'>Plating</span>
          {order.plating.map(o => {
            return <div key={o.id} className='flex text-xl justify-between w-[75%] gap-5'>
            <span>{o.type} Plating</span>
            <span>{o.price}₹</span>
          </div>
          })}
        </div>
        <div className='bg-green-200 p-3 px-7 m-3 rounded-2xl flex items-center justify-between'>
          <span className='font-bold text-2xl'>Total:</span>
          <span className='text-green-800 font-bold text-2xl'>₹{order.total}</span>
        </div>

      </div>
    </div>
  )
}

export default OrderDetailes
